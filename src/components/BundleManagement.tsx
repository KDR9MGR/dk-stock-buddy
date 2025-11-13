import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Package, Minus, Plus, Trash2, Edit2, X, Check, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: string;
  brand: string;
  model: string;
  stock_quantity: number;
  location_type: string;
  location_number: string;
  image_url: string | null;
}

export const BundleManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState({ brand: "", model: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showMultiLocation, setShowMultiLocation] = useState(false);
  const { toast } = useToast();

  // Fetch all bundle products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("location_type", "bundle")
        .order("location_number", { ascending: true })
        .order("brand", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
      filterProducts(data || [], selectedFilter, selectedBundle);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique bundle prefixes (A, A-, B, B-, etc.)
  const getBundlePrefixes = () => {
    const prefixes = new Set<string>();
    products.forEach((product) => {
      const locationNumber = product.location_number.toUpperCase();
      // Extract prefix (A, A-, B, B-, etc.)
      const match = locationNumber.match(/^([A-Z])-?/);
      if (match) {
        const prefix = match[1];
        prefixes.add(prefix);
        // Check if there are variations with dash
        if (locationNumber.startsWith(prefix + "-")) {
          prefixes.add(prefix + "-");
        }
      }
    });
    return Array.from(prefixes).sort();
  };

  // Natural sort function for bundle numbers
  const naturalSort = (a: string, b: string) => {
    // Extract the numeric part from the bundle number
    const aMatch = a.match(/(\d+)/);
    const bMatch = b.match(/(\d+)/);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1]);
      const bNum = parseInt(bMatch[1]);
      return aNum - bNum;
    }

    return a.localeCompare(b);
  };

  // Get unique bundle numbers for selected prefix
  const getBundleNumbers = (prefix: string) => {
    const bundleNumbers = new Set<string>();
    products.forEach((product) => {
      const locationNumber = product.location_number.toUpperCase();
      if (prefix.endsWith("-")) {
        // For prefixes like "A-", match "A-14", "A-15", etc.
        if (locationNumber.startsWith(prefix)) {
          bundleNumbers.add(locationNumber);
        }
      } else {
        // For prefixes like "A", match "A14", "A15", but not "A-14"
        const regex = new RegExp(`^${prefix}\\d+$`);
        if (regex.test(locationNumber)) {
          bundleNumbers.add(locationNumber);
        }
      }
    });
    return Array.from(bundleNumbers).sort(naturalSort);
  };

  // Filter products based on selected filter and bundle
  const filterProducts = (
    productList: Product[],
    filter: string,
    bundle: string | null
  ) => {
    let filtered = productList;

    if (filter !== "all") {
      filtered = filtered.filter((product) => {
        const locationNumber = product.location_number.toUpperCase();
        if (filter.endsWith("-")) {
          return locationNumber.startsWith(filter);
        } else {
          const regex = new RegExp(`^${filter}\\d+$`);
          return regex.test(locationNumber);
        }
      });
    }

    if (bundle) {
      filtered = filtered.filter(
        (product) => product.location_number.toUpperCase() === bundle
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedBundle(null);
    filterProducts(products, filter, null);
  };

  // Handle bundle selection
  const handleBundleSelect = (bundle: string) => {
    setSelectedBundle(bundle);
    filterProducts(products, selectedFilter, bundle);
  };

  // Update quantity
  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({ stock_quantity: newQuantity })
        .eq("id", productId);

      if (error) throw error;

      // Update local state
      const updatedProducts = products.map((p) =>
        p.id === productId ? { ...p, stock_quantity: newQuantity } : p
      );
      setProducts(updatedProducts);
      filterProducts(updatedProducts, selectedFilter, selectedBundle);

      toast({
        title: "Success",
        description: "Quantity updated successfully",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  // Start editing product name
  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditingName({ brand: product.brand, model: product.model });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingProductId(null);
    setEditingName({ brand: "", model: "" });
  };

  // Save edited name
  const saveEditedName = async (productId: string) => {
    if (!editingName.brand.trim() || !editingName.model.trim()) {
      toast({
        title: "Error",
        description: "Brand and Model cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("products")
        .update({
          brand: editingName.brand.trim(),
          model: editingName.model.trim(),
        })
        .eq("id", productId);

      if (error) throw error;

      // Update local state
      const updatedProducts = products.map((p) =>
        p.id === productId
          ? { ...p, brand: editingName.brand.trim(), model: editingName.model.trim() }
          : p
      );
      setProducts(updatedProducts);
      filterProducts(updatedProducts, selectedFilter, selectedBundle);

      toast({
        title: "Success",
        description: "Product name updated successfully",
      });

      cancelEditing();
    } catch (error) {
      console.error("Error updating product name:", error);
      toast({
        title: "Error",
        description: "Failed to update product name",
        variant: "destructive",
      });
    }
  };

  // Delete product
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productToDelete.id);

      if (error) throw error;

      // Update local state
      const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
      setProducts(updatedProducts);
      filterProducts(updatedProducts, selectedFilter, selectedBundle);

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Get products grouped by bundle number
  const getGroupedProducts = () => {
    const grouped: { [key: string]: Product[] } = {};
    filteredProducts.forEach((product) => {
      const bundle = product.location_number.toUpperCase();
      if (!grouped[bundle]) {
        grouped[bundle] = [];
      }
      grouped[bundle].push(product);
    });
    return grouped;
  };

  // Get products with multiple locations
  const getMultiLocationProducts = () => {
    const productMap: { [key: string]: Product[] } = {};

    // Group by brand + model
    products.forEach((product) => {
      const key = `${product.brand}|${product.model}`;
      if (!productMap[key]) {
        productMap[key] = [];
      }
      productMap[key].push(product);
    });

    // Filter only products with multiple locations
    const multiLocationProducts: { [key: string]: Product[] } = {};
    Object.entries(productMap).forEach(([key, prods]) => {
      if (prods.length > 1) {
        multiLocationProducts[key] = prods;
      }
    });

    return multiLocationProducts;
  };

  const bundlePrefixes = getBundlePrefixes();
  const bundleNumbers = selectedFilter !== "all" ? getBundleNumbers(selectedFilter) : [];
  const groupedProducts = getGroupedProducts();
  const multiLocationProducts = getMultiLocationProducts();
  const multiLocationCount = Object.keys(multiLocationProducts).length;

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bundle Management</h1>
          <p className="text-muted-foreground">
            Manage products in bundle locations
          </p>
        </div>
        <Package className="w-8 h-8 text-primary" />
      </div>

      {/* Multi-Location Products Alert */}
      {multiLocationCount > 0 && (
        <Card className="border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <MapPin className="w-5 h-5" />
              Products in Multiple Locations
              <Badge variant="secondary">{multiLocationCount}</Badge>
            </CardTitle>
            <CardDescription>
              These products have entries in different bundle locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={showMultiLocation ? "default" : "outline"}
              onClick={() => setShowMultiLocation(!showMultiLocation)}
              size="sm"
            >
              {showMultiLocation ? "Hide" : "Show"} Multi-Location Products
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Multi-Location Products List */}
      {showMultiLocation && multiLocationCount > 0 && (
        <div className="space-y-3">
          {Object.entries(multiLocationProducts).map(([key, prods]) => {
            const [brand, model] = key.split("|");
            const totalQuantity = prods.reduce((sum, p) => sum + p.stock_quantity, 0);
            return (
              <Card key={key} className="border-orange-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>
                      {brand} - {model}
                    </span>
                    <Badge variant="secondary">
                      Total: {totalQuantity} units in {prods.length} locations
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {prods.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-2 bg-background rounded border"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            Bundle {product.location_number.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Qty: {product.stock_quantity}</Badge>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => startEditing(product)}
                            className="h-7 w-7"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(product.id, product.stock_quantity - 1)
                            }
                            disabled={product.stock_quantity === 0}
                            className="h-7 w-7"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(product.id, product.stock_quantity + 1)
                            }
                            className="h-7 w-7"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteClick(product)}
                            className="h-7 w-7"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Filter Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Bundle Prefix</CardTitle>
          <CardDescription>Select a prefix to view bundles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => handleFilterChange("all")}
              size="sm"
            >
              All Bundles
            </Button>
            {bundlePrefixes.map((prefix) => (
              <Button
                key={prefix}
                variant={selectedFilter === prefix ? "default" : "outline"}
                onClick={() => handleFilterChange(prefix)}
                size="sm"
              >
                {prefix}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bundle Numbers */}
      {selectedFilter !== "all" && bundleNumbers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Bundle Number</CardTitle>
            <CardDescription>
              Click on a bundle to view its products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBundle === null ? "default" : "outline"}
                onClick={() => handleBundleSelect(null as any)}
                size="sm"
              >
                All {selectedFilter} Bundles
              </Button>
              {bundleNumbers.map((bundle) => {
                const count = products.filter(
                  (p) => p.location_number.toUpperCase() === bundle
                ).length;
                return (
                  <Button
                    key={bundle}
                    variant={selectedBundle === bundle ? "default" : "outline"}
                    onClick={() => handleBundleSelect(bundle)}
                    size="sm"
                  >
                    {bundle} <Badge className="ml-2">{count}</Badge>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No products found in bundle locations
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedProducts)
            .sort(([a], [b]) => naturalSort(a, b))
            .map(([bundle, bundleProducts]) => (
              <Card key={bundle}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Bundle {bundle}
                    <Badge variant="secondary">{bundleProducts.length} products</Badge>
                  </CardTitle>
                </CardHeader>
              <CardContent className="space-y-3">
                {bundleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                  >
                    <div className="flex-1 space-y-2">
                      {editingProductId === product.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editingName.brand}
                            onChange={(e) =>
                              setEditingName({ ...editingName, brand: e.target.value })
                            }
                            placeholder="Brand"
                            className="text-sm"
                          />
                          <Input
                            value={editingName.model}
                            onChange={(e) =>
                              setEditingName({ ...editingName, model: e.target.value })
                            }
                            placeholder="Model"
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">{product.brand}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.model}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Qty: {product.stock_quantity}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {editingProductId === product.id ? (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => saveEditedName(product.id)}
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => startEditing(product)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(product.id, product.stock_quantity - 1)
                            }
                            disabled={product.stock_quantity === 0}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(product.id, product.stock_quantity + 1)
                            }
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteClick(product)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>
                {productToDelete?.brand} {productToDelete?.model}
              </strong>{" "}
              from bundle {productToDelete?.location_number}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
