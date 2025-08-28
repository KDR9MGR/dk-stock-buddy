import { Home, Plus, Search, Receipt } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "add-stock", label: "Add Stock", icon: Plus },
    { id: "bills", label: "Bills", icon: Receipt },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border/50 safe-bottom">
      <div className="flex pb-safe">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-1 transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${
                isActive ? "scale-110" : ""
              }`} />
              <span className={`text-xs font-medium ${
                isActive ? "font-semibold" : ""
              }`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};