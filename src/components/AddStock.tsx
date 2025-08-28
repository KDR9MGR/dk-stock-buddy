import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const AddStock = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    stock: "",
    locationType: "",
    locationNumber: "",
    image: null as File | null
  });

  const [existingProduct, setExistingProduct] = useState<any>(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing"];
  const locationTypes = ["Floor", "Bundle", "Rack", "Serial"];

  // Mock existing products for duplicate detection
  const existingProducts = [
    { brand: "Apple", model: "iPhone 15 Pro", stock: 5 },
    { brand: "Samsung", model: "Galaxy S24", stock: 8 },
  ];

  // Check for existing product when model changes
  useEffect(() => {
    if (formData.brand && formData.model) {
      const existing = existingProducts.find(
        p => p.brand.toLowerCase() === formData.brand.toLowerCase() && 
        p.model.toLowerCase() === formData.model.toLowerCase()
      );
      if (existing) {
        setExistingProduct(existing);
        setShowDuplicateAlert(true);
      } else {
        setExistingProduct(null);
        setShowDuplicateAlert(false);
      }
    }
  }, [formData.brand, formData.model]);

  const handleSubmit = () => {
    console.log("Adding stock:", formData);
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
  };

  const handleIncreaseExisting = () => {
    console.log("Increasing stock for existing product:", existingProduct);
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

          {showDuplicateAlert && existingProduct && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="space-y-2">
                  <p><strong>{existingProduct.brand} {formData.model}</strong> already exists with {existingProduct.stock} units in stock.</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleIncreaseExisting}
                      className="text-amber-800 border-amber-300 hover:bg-amber-100"
                    >
                      Increase Stock
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowDuplicateAlert(false)}
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

          <Button onClick={handleSubmit} className="w-full">
            Add to Inventory
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};