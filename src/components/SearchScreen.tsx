import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Minus, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Product = Tables<'products'>;

export const SearchScreen = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Optimized search function with abort controller for better performance
  const searchProducts = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, brand, model, stock_quantity, location_type, location_number, created_at')
        .or(`brand.ilike.%${query}%,model.ilike.%${query}%`)
        .order('brand', { ascending: true })
        .order('model', { ascending: true })
        .order('location_type', { ascending: true })
        .order('location_number', { ascending: true })
        .limit(100); // Increased limit to show more instances

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (error) {
        console.error('Search error:', error);
        toast({
          title: "Search Error",
          description: "Failed to search products. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSearchResults(data || []);
    } catch (error) {
      // Don't show error if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Optimized debounced search with cleanup
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      // Cancel any pending request when component unmounts or query changes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, searchProducts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const updateStock = async (productId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setUpdatingProductId(productId);
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: newQuantity })
        .eq('id', productId);

      if (error) {
        console.error('Update error:', error);
        toast({
          title: "Update Error",
          description: "Failed to update stock quantity. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setSearchResults(prev =>
        prev.map(product =>
          product.id === productId
            ? { ...product, stock_quantity: newQuantity }
            : product
        )
      );

      toast({
        title: "Stock Updated",
        description: `Stock quantity updated successfully.`,
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Update Error",
        description: "Failed to update stock quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleStockIncrease = (product: Product) => {
    updateStock(product.id, product.stock_quantity + 1);
  };

  const handleStockDecrease = (product: Product) => {
    if (product.stock_quantity > 0) {
      updateStock(product.id, product.stock_quantity - 1);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Error deleting product:', error);
        return;
      }

      // Remove the deleted product from search results
      setSearchResults(prev => prev.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Search Inventory</h1>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by brand or model... (min 2 characters)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {isLoading && (
          <p className="text-sm text-muted-foreground mt-2">Searching...</p>
        )}
        {searchResults.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {searchResults.length} result(s). Multiple locations for the same model will be shown separately.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {searchResults.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.brand} {product.model}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      📍 {product.location_type.charAt(0).toUpperCase() + product.location_type.slice(1)} {product.location_number}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-2">
                    Stock: <span className={product.stock_quantity < 5 ? "text-destructive font-bold" : "text-green-600 font-semibold"}>{product.stock_quantity} units</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStockDecrease(product)}
                    disabled={product.stock_quantity === 0 || updatingProductId === product.id}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStockIncrease(product)}
                    disabled={updatingProductId === product.id}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  {product.stock_quantity === 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {searchQuery.length >= 2 && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            No products found matching "{searchQuery}"
          </div>
        )}
        
        {searchQuery.length < 2 && (
          <div className="text-center py-8 text-muted-foreground">
            Enter at least 2 characters to search for products
          </div>
        )}
      </div>
    </div>
  );
};