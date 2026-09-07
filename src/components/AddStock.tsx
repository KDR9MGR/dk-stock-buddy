import { useEffect, useState } from "react";
import { AlertTriangle, PackagePlus, TabletSmartphone } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Product = Tables<"products">;
type ProductInsert = TablesInsert<"products">;
type TabProduct = Tables<"tab_products">;
type TabProductInsert = TablesInsert<"tab_products">;

const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing", "Motorola", "Infinix", "Google Pixel"];
const locationTypes = ["floor", "bundle", "rack", "serial"];
const tabBrands = ["Apple", "Samsung", "Lenovo", "Xiaomi", "OnePlus", "Realme", "Oppo", "Vivo", "Motorola", "Honor", "Other"];

const initialCoverForm = {
  brand: "",
  model: "",
  stock: "",
  locationType: "",
  locationNumber: "",
  image: null as File | null,
};

const initialTabForm = {
  itemType: "cover",
  brand: "",
  model: "",
  inch: "",
  title: "",
  location: "",
  stock: "",
};

export const AddStock = () => {
  const { toast } = useToast();
  const [coverForm, setCoverForm] = useState(initialCoverForm);
  const [tabForm, setTabForm] = useState(initialTabForm);
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const [existingTabProduct, setExistingTabProduct] = useState<TabProduct | null>(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [showTabDuplicateAlert, setShowTabDuplicateAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [isCheckingTabDuplicate, setIsCheckingTabDuplicate] = useState(false);

  useEffect(() => {
    const checkForDuplicate = async () => {
      if (coverForm.brand && coverForm.model) {
        setIsCheckingDuplicate(true);
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .ilike("brand", coverForm.brand)
            .ilike("model", coverForm.model)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error checking for duplicate:", error);
            return;
          }

          setExistingProduct(data || null);
          setShowDuplicateAlert(Boolean(data));
        } catch (error) {
          console.error("Error checking for duplicate:", error);
        } finally {
          setIsCheckingDuplicate(false);
        }
      } else {
        setExistingProduct(null);
        setShowDuplicateAlert(false);
      }
    };

    const timeoutId = window.setTimeout(checkForDuplicate, 500);
    return () => window.clearTimeout(timeoutId);
  }, [coverForm.brand, coverForm.model]);

  useEffect(() => {
    const checkForTabDuplicate = async () => {
      if (tabForm.itemType && tabForm.brand && tabForm.model && tabForm.title) {
        setIsCheckingTabDuplicate(true);
        try {
          const { data, error } = await supabase
            .from("tab_products")
            .select("*")
            .eq("item_type", tabForm.itemType)
            .ilike("brand", tabForm.brand)
            .ilike("model", tabForm.model)
            .ilike("title", tabForm.title)
            .maybeSingle();

          if (error) {
            console.error("Error checking for duplicate TAB stock:", error);
            return;
          }

          setExistingTabProduct(data || null);
          setShowTabDuplicateAlert(Boolean(data));
        } catch (error) {
          console.error("Error checking for duplicate TAB stock:", error);
        } finally {
          setIsCheckingTabDuplicate(false);
        }
      } else {
        setExistingTabProduct(null);
        setShowTabDuplicateAlert(false);
      }
    };

    const timeoutId = window.setTimeout(checkForTabDuplicate, 500);
    return () => window.clearTimeout(timeoutId);
  }, [tabForm.itemType, tabForm.brand, tabForm.model, tabForm.title]);

  const resetCoverForm = () => {
    setCoverForm(initialCoverForm);
    setShowDuplicateAlert(false);
    setExistingProduct(null);
  };

  const resetTabForm = () => {
    setTabForm(initialTabForm);
    setShowTabDuplicateAlert(false);
    setExistingTabProduct(null);
  };

  const handleCoverSubmit = async () => {
    if (!coverForm.brand || !coverForm.model || !coverForm.stock || !coverForm.locationType || !coverForm.locationNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required cover fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const productData: ProductInsert = {
        brand: coverForm.brand,
        model: coverForm.model,
        stock_quantity: parseInt(coverForm.stock, 10),
        location_type: coverForm.locationType,
        location_number: coverForm.locationNumber,
        image_url: null,
      };

      const { error } = await supabase.from("products").insert([productData]);

      if (error) {
        console.error("Error inserting product:", error);
        toast({
          title: "Error",
          description: "Failed to add cover stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${coverForm.brand} ${coverForm.model} has been added to inventory.`,
      });
      resetCoverForm();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseExisting = async () => {
    if (!existingProduct || !coverForm.stock) {
      toast({
        title: "Error",
        description: "Please enter a valid stock quantity.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newStockQuantity = existingProduct.stock_quantity + parseInt(coverForm.stock, 10);
      const { error } = await supabase
        .from("products")
        .update({
          stock_quantity: newStockQuantity,
          location_type: coverForm.locationType || existingProduct.location_type,
          location_number: coverForm.locationNumber || existingProduct.location_number,
        })
        .eq("id", existingProduct.id);

      if (error) {
        console.error("Error updating product:", error);
        toast({
          title: "Error",
          description: "Failed to update cover stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Stock increased! ${existingProduct.brand} ${existingProduct.model} now has ${newStockQuantity} units.`,
      });
      resetCoverForm();
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabSubmit = async () => {
    if (!tabForm.itemType || !tabForm.brand || !tabForm.model || !tabForm.title || !tabForm.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in type, brand, model, title, and stock.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const tabProductData: TabProductInsert = {
        item_type: tabForm.itemType,
        brand: tabForm.brand,
        model: tabForm.model,
        inch: tabForm.inch.trim() || null,
        title: tabForm.title,
        location: tabForm.location.trim() || null,
        stock_quantity: parseInt(tabForm.stock, 10),
      };

      const { error } = await supabase.from("tab_products").insert([tabProductData]);

      if (error) {
        console.error("Error inserting TAB product:", error);
        toast({
          title: "Error",
          description: "Failed to add TAB stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${tabForm.brand} ${tabForm.model} ${tabForm.title} has been added to TAB stock.`,
      });
      resetTabForm();
    } catch (error) {
      console.error("Error adding TAB product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseExistingTab = async () => {
    if (!existingTabProduct || !tabForm.stock) {
      toast({
        title: "Error",
        description: "Please enter a valid stock quantity.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newStockQuantity = existingTabProduct.stock_quantity + parseInt(tabForm.stock, 10);
      const { error } = await supabase
        .from("tab_products")
        .update({
          inch: tabForm.inch.trim() || existingTabProduct.inch,
          location: tabForm.location.trim() || existingTabProduct.location,
          stock_quantity: newStockQuantity,
        })
        .eq("id", existingTabProduct.id);

      if (error) {
        console.error("Error updating TAB product:", error);
        toast({
          title: "Error",
          description: "Failed to update TAB stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `TAB stock increased to ${newStockQuantity} units.`,
      });
      resetTabForm();
    } catch (error) {
      console.error("Error updating TAB product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Add New Stock</h1>

      <Tabs defaultValue="cover" className="w-full">
        <TabsList className="mb-4 grid h-11 w-full grid-cols-2">
          <TabsTrigger value="cover">Cover</TabsTrigger>
          <TabsTrigger value="tab">TAB</TabsTrigger>
        </TabsList>

        <TabsContent value="cover" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Brand</Label>
                <Select value={coverForm.brand} onValueChange={(value) => setCoverForm({ ...coverForm, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Model</Label>
                <Input placeholder="Enter model name" value={coverForm.model} onChange={(event) => setCoverForm({ ...coverForm, model: event.target.value })} />
              </div>

              {isCheckingDuplicate && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">Checking for existing products...</AlertDescription>
                </Alert>
              )}

              {showDuplicateAlert && existingProduct && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <div className="space-y-2">
                      <p>
                        <strong>
                          {existingProduct.brand} {existingProduct.model}
                        </strong>{" "}
                        already exists with {existingProduct.stock_quantity} units in stock.
                      </p>
                      <p className="text-sm">
                        Location: {existingProduct.location_type} {existingProduct.location_number}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleIncreaseExisting}
                          disabled={isLoading || !coverForm.stock}
                          className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          {isLoading ? "Updating..." : "Increase Stock"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowDuplicateAlert(false)}
                          disabled={isLoading}
                          className="text-amber-800 hover:bg-amber-100"
                        >
                          Add Anyway
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label>Stock Quantity</Label>
                <Input type="number" min="0" placeholder="Enter quantity" value={coverForm.stock} onChange={(event) => setCoverForm({ ...coverForm, stock: event.target.value })} />
              </div>

              <div>
                <Label>Location Type</Label>
                <Select value={coverForm.locationType} onValueChange={(value) => setCoverForm({ ...coverForm, locationType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location Number</Label>
                <Input
                  placeholder="Enter location number (e.g. 1, 2, 3...)"
                  value={coverForm.locationNumber}
                  onChange={(event) => setCoverForm({ ...coverForm, locationNumber: event.target.value })}
                />
              </div>

              <Button onClick={handleCoverSubmit} className="w-full" disabled={isLoading || isCheckingDuplicate}>
                <PackagePlus className="mr-2 h-4 w-4" />
                {isLoading ? "Adding Stock..." : "Add to Inventory"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tab" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>TAB Stock Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Stock Type</Label>
                <Select value={tabForm.itemType} onValueChange={(value) => setTabForm({ ...tabForm, itemType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Tab Cover</SelectItem>
                    <SelectItem value="glass">Tab Glass</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Brand</Label>
                <Select value={tabForm.brand} onValueChange={(value) => setTabForm({ ...tabForm, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {tabBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Model</Label>
                <Input placeholder="Enter tab model" value={tabForm.model} onChange={(event) => setTabForm({ ...tabForm, model: event.target.value })} />
              </div>

              <div>
                <Label>Inch Optional</Label>
                <Input placeholder="e.g. 10.2, 11, 12.9" value={tabForm.inch} onChange={(event) => setTabForm({ ...tabForm, inch: event.target.value })} />
              </div>

              <div>
                <Label>Title</Label>
                <Input
                  placeholder="e.g. Tempered glass, flip cover, keyboard cover"
                  value={tabForm.title}
                  onChange={(event) => setTabForm({ ...tabForm, title: event.target.value })}
                />
              </div>

              {isCheckingTabDuplicate && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">Checking for existing TAB stock...</AlertDescription>
                </Alert>
              )}

              {showTabDuplicateAlert && existingTabProduct && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <div className="space-y-2">
                      <p>
                        <strong>
                          {existingTabProduct.brand} {existingTabProduct.model} {existingTabProduct.title}
                        </strong>{" "}
                        already exists with {existingTabProduct.stock_quantity} units.
                      </p>
                      <p className="text-sm">Location: {existingTabProduct.location || "Not set"}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleIncreaseExistingTab}
                          disabled={isLoading || !tabForm.stock}
                          className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          {isLoading ? "Updating..." : "Increase Stock"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowTabDuplicateAlert(false)}
                          disabled={isLoading}
                          className="text-amber-800 hover:bg-amber-100"
                        >
                          Add Anyway
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label>Location Optional</Label>
                <Input placeholder="Rack, drawer, bundle, or shelf" value={tabForm.location} onChange={(event) => setTabForm({ ...tabForm, location: event.target.value })} />
              </div>

              <div>
                <Label>Stock Quantity</Label>
                <Input type="number" min="0" placeholder="Enter quantity" value={tabForm.stock} onChange={(event) => setTabForm({ ...tabForm, stock: event.target.value })} />
              </div>

              <Button onClick={handleTabSubmit} className="w-full" disabled={isLoading || isCheckingTabDuplicate}>
                <TabletSmartphone className="mr-2 h-4 w-4" />
                {isLoading ? "Adding TAB Stock..." : "Add TAB Stock"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
