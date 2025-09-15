import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, ChevronLeft } from "lucide-react";
import { App } from "./app-card";

interface AppDetailPageProps {
  app: App;
  onBack: () => void;
  onRequestAccess: (app: App) => void;
}

export function AppDetailPage({ app, onBack, onRequestAccess }: AppDetailPageProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-4 sm:mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto sm:mx-0">
            <span className="text-3xl sm:text-5xl">{app.icon}</span>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{app.name}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  {renderStars(app.rating)}
                  <span className="text-sm text-gray-600">({app.rating}/5)</span>
                </div>
                <Badge className="mb-4">{app.category}</Badge>
              </div>
              
              <div className="flex flex-col gap-2 sm:items-end">
                {!app.hasAccess && (
                  <Button 
                    onClick={() => onRequestAccess(app)}
                    className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Request Access
                  </Button>
                )}
                
                {app.hasAccess && (
                  <Badge className="bg-green-500 text-white w-fit mx-auto sm:mx-0">
                    ✅ You have access
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Screenshots */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {app.screenshots?.map((screenshot, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Screenshot {index + 1}</span>
                  </div>
                )) || (
                  // Default placeholders
                  <>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Screenshot 1</span>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Screenshot 2</span>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Screenshot 3</span>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Demo Video</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{app.description}</p>
            </div>

            {/* Features */}
            {app.features && (
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1 text-sm">✓</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Access Requirements */}
            {app.accessRequirements && (
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Access Requirements</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <ul className="space-y-1">
                    {app.accessRequirements.map((req, index) => (
                      <li key={index} className="text-sm text-yellow-800">• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Ratings */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-2">User Reviews</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(5)}
                    <span className="text-sm font-medium">Sarah M.</span>
                  </div>
                  <p className="text-sm text-gray-600">"Great tool for productivity!"</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(4)}
                    <span className="text-sm font-medium">John D.</span>
                  </div>
                  <p className="text-sm text-gray-600">"Easy to use and reliable."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}