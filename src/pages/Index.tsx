import { useState } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { Dashboard } from "@/components/Dashboard";
import { AddStock } from "@/components/AddStock";
import { SearchScreen } from "@/components/SearchScreen";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-stock":
        return <AddStock />;
      case "search":
        return <SearchScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 text-center font-bold text-lg">
        D.K Mobiles
      </header>
      
      <main className="pb-20">
        {renderActiveScreen()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
