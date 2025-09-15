import { useState } from "react";
import { AppCard, App } from "./app-card";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface CatalogPageProps {
  apps: App[];
  onViewAppDetails: (app: App) => void;
  onRequestAccess: (app: App) => void;
}

export function CatalogPage({ apps, onViewAppDetails, onRequestAccess }: CatalogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ["HR", "Engineering", "Sales", "IT", "Finance", "Marketing", "Design"];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(app.category);

    const matchesFilters = (!showPopularOnly || app.rating >= 4);

    return matchesSearch && matchesCategory && matchesFilters;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id.localeCompare(a.id); // Simple newest first
      case "recommended":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.rating - a.rating;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setShowPopularOnly(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Additional</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="popular"
              checked={showPopularOnly}
              onCheckedChange={setShowPopularOnly}
            />
            <label htmlFor="popular" className="text-sm cursor-pointer">
              Popular (4+ stars)
            </label>
          </div>
        </div>
      </div>

      {(selectedCategories.length > 0 || showPopularOnly) && (
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Desktop Sidebar - Filters */}
      <div className="hidden lg:block w-64 p-6 bg-gray-50 border-r border-gray-200">
        <h3 className="font-semibold mb-4">Filters</h3>
        <FilterContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Mobile/Tablet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
            
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Sort by: Popularity</SelectItem>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="recommended">Sort by: Recommended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 || showPopularOnly) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategories.map(category => (
              <div key={category} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {category}
                <button onClick={() => toggleCategory(category)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {showPopularOnly && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Popular
                <button onClick={() => setShowPopularOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Showing {sortedApps.length} of {apps.length} apps
            {selectedCategories.length > 0 && (
              <span> in {selectedCategories.join(", ")}</span>
            )}
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
          {sortedApps.map(app => (
            <AppCard
              key={app.id}
              app={app}
              onViewDetails={onViewAppDetails}
              onRequestAccess={onRequestAccess}
            />
          ))}
        </div>

        {sortedApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No apps found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}