import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Product = Tables<'products'>;
type ProductInsert = TablesInsert<'products'>;

export const AddStock = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    stock: "",
    locationType: "",
    locationNumber: "",
    image: null as File | null
  });

  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing"];
  const locationTypes = ["floor", "bundle", "rack", "serial"];

  // Check for existing product when brand or model changes
  useEffect(() => {
    const checkForDuplicate = async () => {
      if (formData.brand && formData.model) {
        setIsCheckingDuplicate(true);
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('brand', formData.brand)
            .ilike('model', formData.model)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error('Error checking for duplicate:', error);
            return;
          }

          if (data) {
            setExistingProduct(data);
            setShowDuplicateAlert(true);
          } else {
            setExistingProduct(null);
            setShowDuplicateAlert(false);
          }
        } catch (error) {
          console.error('Error checking for duplicate:', error);
        } finally {
          setIsCheckingDuplicate(false);
        }
      } else {
        setExistingProduct(null);
        setShowDuplicateAlert(false);
      }
    };

    const timeoutId = setTimeout(checkForDuplicate, 500); // Debounce the API call
    return () => clearTimeout(timeoutId);
  }, [formData.brand, formData.model]);

  const handleSubmit = async () => {
    if (!formData.brand || !formData.model || !formData.stock || !formData.locationType || !formData.locationNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const productData: ProductInsert = {
        brand: formData.brand,
        model: formData.model,
        stock_quantity: parseInt(formData.stock),
        location_type: formData.locationType,
        location_number: formData.locationNumber,
        image_url: null, // TODO: Handle image upload later
      };

      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Error inserting product:', error);
        toast({
          title: "Error",
          description: "Failed to add product to inventory. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${formData.brand} ${formData.model} has been added to inventory.`,
      });

      // Reset form
      setFormData({
        brand: "",
        model: "",
        stock: "",
        locationType: "",
        locationNumber: "",
        image: null
      });
      setShowDuplicateAlert(false);
      setExistingProduct(null);
    } catch (error) {
      console.error('Error adding product:', error);
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
    if (!existingProduct || !formData.stock) {
      toast({
        title: "Error",
        description: "Please enter a valid stock quantity.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newStockQuantity = existingProduct.stock_quantity + parseInt(formData.stock);
      
      const { data, error } = await supabase
        .from('products')
        .update({ 
          stock_quantity: newStockQuantity,
          location_type: formData.locationType || existingProduct.location_type,
          location_number: formData.locationNumber || existingProduct.location_number
        })
        .eq('id', existingProduct.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Error",
          description: "Failed to update product stock. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Stock increased! ${existingProduct.brand} ${existingProduct.model} now has ${newStockQuantity} units.`,
      });

      // Reset form
      setFormData({
        brand: "",
        model: "",
        stock: "",
        locationType: "",
        locationNumber: "",
        image: null
      });
      setShowDuplicateAlert(false);
      setExistingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
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
      <h1 className="text-2xl font-bold text-foreground mb-4">Add New Stock</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Brand</Label>
            <Select value={formData.brand} onValueChange={(value) => setFormData({...formData, brand: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Model</Label>
            <Input
              placeholder="Enter model name"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
            />
          </div>

          {isCheckingDuplicate && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Checking for existing products...
              </AlertDescription>
            </Alert>
          )}

          {showDuplicateAlert && existingProduct && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="space-y-2">
                  <p><strong>{existingProduct.brand} {existingProduct.model}</strong> already exists with {existingProduct.stock_quantity} units in stock.</p>
                  <p className="text-sm">Location: {existingProduct.location_type} {existingProduct.location_number}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleIncreaseExisting}
                      disabled={isLoading || !formData.stock}
                      className="text-amber-800 border-amber-300 hover:bg-amber-100"
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
            <Input
              type="number"
              placeholder="Enter quantity"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>

          <div>
            <Label>Location Type</Label>
            <Select value={formData.locationType} onValueChange={(value) => setFormData({...formData, locationType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                {locationTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Location Number</Label>
            <Input
              placeholder="Enter location number (e.g. 1, 2, 3...)"
              value={formData.locationNumber}
              onChange={(e) => setFormData({...formData, locationNumber: e.target.value})}
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={isLoading || isCheckingDuplicate}
          >
            {isLoading ? "Adding Stock..." : "Add to Inventory"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};