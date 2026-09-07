import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Product = Tables<"products">;
type TabProduct = Tables<"tab_products">;

type SearchResult =
  | {
      kind: "cover";
      product: Product;
    }
  | {
      kind: "tab";
      product: TabProduct;
    };

const normalizeSearchTerm = (value: string) => value.trim().replace(/[%_,]/g, " ");

const buildCoverSearchText = (product: Product) =>
  [product.brand, product.model, product.location_type, product.location_number, `${product.location_type} ${product.location_number}`]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const buildTabSearchText = (product: TabProduct) =>
  [
    product.item_type,
    product.item_type === "glass" ? "tab glass tempered glass screen protector" : "tab cover tablet cover case",
    product.brand,
    product.model,
    product.inch,
    product.title,
    product.location,
    product.inch ? `${product.inch} inch` : "",
    product.inch ? `${product.inch.replace(/\s+/g, "")}inch` : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const matchesAllTerms = (searchText: string, query: string) =>
  query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => searchText.includes(term));

export const SearchScreen = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchProducts = useCallback(
    async (rawQuery: string) => {
      const query = normalizeSearchTerm(rawQuery);

      if (query.length < 2) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current?.abort();
      const requestController = new AbortController();
      abortControllerRef.current = requestController;

      setIsLoading(true);
      try {
        const wildcard = `%${query}%`;
        const [coverResponse, tabResponse] = await Promise.all([
          supabase
            .from("products")
            .select("*")
            .or(`brand.ilike.${wildcard},model.ilike.${wildcard},location_type.ilike.${wildcard},location_number.ilike.${wildcard}`)
            .order("brand", { ascending: true })
            .order("model", { ascending: true })
            .order("location_type", { ascending: true })
            .order("location_number", { ascending: true })
            .limit(100),
          supabase
            .from("tab_products")
            .select("*")
            .or(`item_type.ilike.${wildcard},brand.ilike.${wildcard},model.ilike.${wildcard},inch.ilike.${wildcard},title.ilike.${wildcard},location.ilike.${wildcard}`)
            .order("brand", { ascending: true })
            .order("model", { ascending: true })
            .order("title", { ascending: true })
            .limit(100),
        ]);

        if (requestController.signal.aborted) return;

        const searchError = coverResponse.error || tabResponse.error;
        if (searchError) {
          console.error("Search error:", searchError);
          toast({
            title: "Search Error",
            description: "Failed to search products. Please try again.",
            variant: "destructive",
          });
          return;
        }

        const coverResults = (coverResponse.data || [])
          .filter((product) => matchesAllTerms(buildCoverSearchText(product), query))
          .map((product) => ({ kind: "cover" as const, product }));
        const tabResults = (tabResponse.data || [])
          .filter((product) => matchesAllTerms(buildTabSearchText(product), query))
          .map((product) => ({ kind: "tab" as const, product }));

        setSearchResults([...coverResults, ...tabResults]);
      } catch (error) {
        if (requestController.signal.aborted) return;

        console.error("Search error:", error);
        toast({
          title: "Search Error",
          description: "Failed to search products. Please try again.",
          variant: "destructive",
        });
      } finally {
        if (!requestController.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [toast],
  );

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => {
      window.clearTimeout(debounceTimer);
      abortControllerRef.current?.abort();
    };
  }, [searchQuery, searchProducts]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const updateStock = async (result: SearchResult, newQuantity: number) => {
    if (newQuantity < 0) return;

    setUpdatingProductId(`${result.kind}-${result.product.id}`);
    try {
      const query =
        result.kind === "cover"
          ? supabase.from("products").update({ stock_quantity: newQuantity }).eq("id", result.product.id)
          : supabase.from("tab_products").update({ stock_quantity: newQuantity }).eq("id", result.product.id);

      const { error } = await query;

      if (error) {
        console.error("Update error:", error);
        toast({
          title: "Update Error",
          description: "Failed to update stock quantity. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSearchResults((prev) =>
        prev.map((item) =>
          item.kind === result.kind && item.product.id === result.product.id
            ? { ...item, product: { ...item.product, stock_quantity: newQuantity } }
            : item,
        ),
      );

      toast({
        title: "Stock Updated",
        description: "Stock quantity updated successfully.",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Update Error",
        description: "Failed to update stock quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleDeleteProduct = async (result: SearchResult) => {
    try {
      const query =
        result.kind === "cover"
          ? supabase.from("products").delete().eq("id", result.product.id)
          : supabase.from("tab_products").delete().eq("id", result.product.id);

      const { error } = await query;

      if (error) {
        console.error("Error deleting product:", error);
        return;
      }

      setSearchResults((prev) => prev.filter((item) => !(item.kind === result.kind && item.product.id === result.product.id)));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const renderProductTitle = (result: SearchResult) => {
    if (result.kind === "cover") {
      return `${result.product.brand} ${result.product.model}`;
    }

    const inch = result.product.inch ? ` ${result.product.inch}"` : "";
    return `${result.product.brand} ${result.product.model}${inch} - ${result.product.title}`;
  };

  const renderLocation = (result: SearchResult) => {
    if (result.kind === "cover") {
      return `${result.product.location_type.charAt(0).toUpperCase() + result.product.location_type.slice(1)} ${result.product.location_number}`;
    }

    return result.product.location || "Location not set";
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Search Inventory</h1>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search brand, model, inch, title, or location..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10"
          />
        </div>
        {isLoading && <p className="mt-2 text-sm text-muted-foreground">Searching...</p>}
        {searchResults.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {searchResults.length} result(s). Type an inch like 10.9, brand, model, glass, cover, or location.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {searchResults.map((result) => {
          const productKey = `${result.kind}-${result.product.id}`;
          const isUpdating = updatingProductId === productKey;

          return (
            <Card key={productKey}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant={result.kind === "tab" ? "default" : "secondary"}>
                        {result.kind === "tab" ? `TAB ${result.product.item_type.toUpperCase()}` : "Cover"}
                      </Badge>
                      <Badge variant="outline">{renderLocation(result)}</Badge>
                    </div>
                    <h3 className="break-words text-lg font-semibold">{renderProductTitle(result)}</h3>
                    {result.kind === "tab" && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {result.product.inch ? `${result.product.inch} inch | ` : ""}
                        {result.product.item_type === "glass" ? "Tab Glass" : "Tab Cover"}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-medium">
                      Stock:{" "}
                      <span className={result.product.stock_quantity < 5 ? "font-bold text-destructive" : "font-semibold text-green-600"}>
                        {result.product.stock_quantity} units
                      </span>
                    </p>
                  </div>
                  <div className="ml-2 flex shrink-0 items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStock(result, result.product.stock_quantity - 1)} disabled={result.product.stock_quantity === 0 || isUpdating}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStock(result, result.product.stock_quantity + 1)} disabled={isUpdating}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    {result.product.stock_quantity === 0 && (
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(result)} className="ml-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {searchQuery.length >= 2 && searchResults.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No products found matching "{searchQuery}"</div>}

        {searchQuery.length < 2 && <div className="py-8 text-center text-muted-foreground">Enter at least 2 characters to search inventory</div>}
      </div>
    </div>
  );
};
