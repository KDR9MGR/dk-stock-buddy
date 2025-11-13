import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Package } from "lucide-react";

type Product = Tables<'products'>;

interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  uniqueBrands: number;
  uniqueLocations: number;
  bundleACount: number;
  bundleBCount: number;
}

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockCount: 0,
    uniqueBrands: 0,
    uniqueLocations: 0,
    bundleACount: 0,
    bundleBCount: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [brandDistribution, setBrandDistribution] = useState<{ brand: string; count: number; percentage: number; color: string }[]>([]);
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

        // Count Bundle A products (location_type = "bundle" and location_number starts with A or A-)
        const bundleACount = products.filter(p => {
          if (p.location_type !== 'bundle') return false;
          const locationNumber = p.location_number.toUpperCase();
          return /^A-?\d+$/.test(locationNumber);
        }).length;

        // Count Bundle B products (location_type = "bundle" and location_number starts with B or B-)
        const bundleBCount = products.filter(p => {
          if (p.location_type !== 'bundle') return false;
          const locationNumber = p.location_number.toUpperCase();
          return /^B-?\d+$/.test(locationNumber);
        }).length;

        setStats({
          totalProducts,
          lowStockCount,
          uniqueBrands,
          uniqueLocations,
          bundleACount,
          bundleBCount,
        });

        // Calculate brand distribution
        const brandCounts: { [key: string]: number } = {};
        products.forEach(p => {
          brandCounts[p.brand] = (brandCounts[p.brand] || 0) + p.stock_quantity;
        });

        const brandColors = [
          '#3b82f6', // blue
          '#10b981', // green
          '#f59e0b', // amber
          '#ef4444', // red
          '#8b5cf6', // violet
          '#ec4899', // pink
          '#06b6d4', // cyan
        ];

        const brandDistData = Object.entries(brandCounts)
          .map(([brand, count], index) => ({
            brand,
            count,
            percentage: Math.round((count / totalProducts) * 100),
            color: brandColors[index % brandColors.length],
          }))
          .sort((a, b) => b.count - a.count);

        setBrandDistribution(brandDistData);

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        {onNavigate && (
          <Button
            onClick={() => onNavigate("bundle-management")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Bundles
          </Button>
        )}
      </div>

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

        <Card className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700 dark:text-blue-400">Bundle A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.bundleACount}</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 dark:text-green-400">Bundle B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.bundleBCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Distribution Circular Bars */}
      {brandDistribution.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Brand Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 py-4">
              {brandDistribution.map((brand) => (
                <div key={brand.brand} className="flex flex-col items-center gap-2">
                  <div className="relative w-24 h-24">
                    {/* Background Circle */}
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={brand.color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - brand.percentage / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold" style={{ color: brand.color }}>
                        {brand.percentage}%
                      </span>
                    </div>
                  </div>
                  {/* Brand Name and Quantity */}
                  <div className="text-center">
                    <p className="font-semibold text-sm">{brand.brand}</p>
                    <p className="text-xs text-muted-foreground">{brand.count} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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