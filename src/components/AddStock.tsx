import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const AddStock = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    stock: "",
    bundle: "",
    rack: "",
    serial: "",
    floor: "",
    image: null as File | null
  });

  const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing"];
  const bundles = ["Bundle A", "Bundle B", "Bundle C", "Bundle D"];
  const racks = ["Rack 1", "Rack 2", "Rack 3", "Rack 4"];
  const floors = ["Ground Floor", "First Floor", "Second Floor"];

  const handleSubmit = () => {
    console.log("Adding stock:", formData);
    // Reset form
    setFormData({
      brand: "",
      model: "",
      stock: "",
      bundle: "",
      rack: "",
      serial: "",
      floor: "",
      image: null
    });
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
            <Label>Floor</Label>
            <Select value={formData.floor} onValueChange={(value) => setFormData({...formData, floor: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent>
                {floors.map(floor => (
                  <SelectItem key={floor} value={floor}>{floor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Bundle</Label>
            <Select value={formData.bundle} onValueChange={(value) => setFormData({...formData, bundle: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select bundle" />
              </SelectTrigger>
              <SelectContent>
                {bundles.map(bundle => (
                  <SelectItem key={bundle} value={bundle}>{bundle}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rack</Label>
            <Select value={formData.rack} onValueChange={(value) => setFormData({...formData, rack: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select rack" />
              </SelectTrigger>
              <SelectContent>
                {racks.map(rack => (
                  <SelectItem key={rack} value={rack}>{rack}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Serial (Optional)</Label>
            <Input
              placeholder="Enter serial number"
              value={formData.serial}
              onChange={(e) => setFormData({...formData, serial: e.target.value})}
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