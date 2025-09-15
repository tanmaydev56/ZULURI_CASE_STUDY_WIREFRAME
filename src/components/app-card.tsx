import { Star, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface App {
  id: string;
  name: string;
  description: string;
  rating: number;
  category: string;
  hasAccess: boolean;
  icon: string;
  screenshots?: string[];
  features?: string[];
  accessRequirements?: string[];
}

interface AppCardProps {
  app: App;
  onViewDetails: (app: App) => void;
  onRequestAccess: (app: App) => void;
}

export function AppCard({ app, onViewDetails, onRequestAccess }: AppCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm p-4 w-full min-h-[200px] flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* App Icon */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
        <span className="text-xl sm:text-2xl">{app.icon}</span>
      </div>

      {/* App Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">{app.name}</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
          {app.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {renderStars(app.rating)}
        </div>
      </div>

      {/* Access Status & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {app.hasAccess ? (
          <Badge className="bg-green-500 text-white text-xs rounded-full px-2 py-1 w-fit">
            ✅ Have Access
          </Badge>
        ) : (
          <Badge className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 w-fit">
            🔒 Request Access
          </Badge>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(app)}
          className="text-xs w-full sm:w-auto"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}