import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Minus } from "lucide-react";

interface Product {
  id: string;
  brand: string;
  model: string;
  stock: number;
  location: {
    floor: string;
    bundle: string;
    rack: string;
    serial?: string;
  };
}

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      brand: "Apple",
      model: "iPhone 15 Pro",
      stock: 5,
      location: { floor: "Ground Floor", bundle: "Bundle A", rack: "Rack 1", serial: "A001" }
    },
    {
      id: "2",
      brand: "Samsung",
      model: "Galaxy S24",
      stock: 8,
      location: { floor: "First Floor", bundle: "Bundle B", rack: "Rack 2", serial: "S002" }
    },
    {
      id: "3",
      brand: "OnePlus",
      model: "12 Pro",
      stock: 3,
      location: { floor: "Ground Floor", bundle: "Bundle C", rack: "Rack 3" }
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = mockProducts.filter(product =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleStockDecrease = (productId: string) => {
    setSearchResults(prev =>
      prev.map(product =>
        product.id === productId && product.stock > 0
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Search Inventory</h1>
      
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by brand or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="space-y-3">
        {searchResults.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{product.brand} {product.model}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.location.floor} • {product.location.bundle} • {product.location.rack}
                    {product.location.serial && ` • ${product.location.serial}`}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Stock: <span className={product.stock < 5 ? "text-destructive" : "text-foreground"}>{product.stock}</span>
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStockDecrease(product.id)}
                  disabled={product.stock === 0}
                  className="ml-4"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found matching "{searchQuery}"
          </div>
        )}
        
        {!searchQuery && (
          <div className="text-center py-8 text-muted-foreground">
            Enter a search term to find products
          </div>
        )}
      </div>
    </div>
  );
};