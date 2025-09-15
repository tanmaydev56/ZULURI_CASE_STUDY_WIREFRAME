import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: "catalog", label: "Catalog" },
    { id: "my-apps", label: "My Apps" },
 
    { id: "help", label: "Help" }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">📱</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Employee App Catalog</span>
            <span className="font-semibold text-base sm:hidden">App Catalog</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className="text-sm"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm justify-start"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}