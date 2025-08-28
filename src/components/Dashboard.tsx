import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Product = Tables<'products'>;

interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  uniqueBrands: number;
  uniqueLocations: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockCount: 0,
    uniqueBrands: 0,
    uniqueLocations: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all products
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      if (products) {
        // Calculate statistics
        const totalProducts = products.length;
        const lowStockCount = products.filter(p => p.stock_quantity <= 5).length;
        const uniqueBrands = new Set(products.map(p => p.brand)).size;
        const uniqueLocations = new Set(products.map(p => `${p.location_type}-${p.location_number}`)).size;

        setStats({
          totalProducts,
          lowStockCount,
          uniqueBrands,
          uniqueLocations,
        });

        // Set recent products (last 5)
        setRecentProducts(products.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.lowStockCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueBrands}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueLocations}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentProducts.length > 0 ? (
              recentProducts.map((product, index) => (
                <div key={product.id} className={`flex justify-between items-center py-2 ${index < recentProducts.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{product.brand} {product.model}</span>
                    <span className="text-xs text-muted-foreground">
                      Stock: {product.stock_quantity} | {product.location_type.charAt(0).toUpperCase() + product.location_type.slice(1)} {product.location_number}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(product.created_at)}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};