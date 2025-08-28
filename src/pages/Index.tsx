import { useState, useEffect } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { Dashboard } from "@/components/Dashboard";
import { AddStock } from "@/components/AddStock";
import { SearchScreen } from "@/components/SearchScreen";
import { Bills } from "@/components/Bills";
import { BottomNav } from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Plus } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={() => {}} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-stock":
        return <AddStock />;
      case "search":
        return <SearchScreen />;
      case "bills":
        return <Bills />;
      default:
        return <Dashboard />;
    }
  };

  const handleAddProduct = () => {
    // This will be handled by the Bills component's add product functionality
    const event = new CustomEvent('openAddProduct');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10 text-primary-foreground">
        <div className="safe-area-inset-top"></div>
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="font-semibold text-xl tracking-tight">D.K Mobiles</h1>
          {activeTab === "bills" ? (
            <button 
              onClick={handleAddProduct}
              className="text-sm font-medium bg-primary-foreground/15 hover:bg-primary-foreground/25 active:bg-primary-foreground/30 px-3 py-2 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          ) : (
            <button 
              onClick={() => supabase.auth.signOut()}
              className="text-sm font-medium bg-primary-foreground/15 hover:bg-primary-foreground/25 active:bg-primary-foreground/30 px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      
      <main className="pb-20 pt-2">
        <div className="px-1">
          {renderActiveScreen()}
        </div>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
