import { useState } from "react";
import { NavigationBar } from "./components/navigation-bar";
import { CatalogPage } from "./components/catalog-page";
import { AppDetailPage } from "./components/app-detail-page";
import { DashboardPage } from "./components/dashboard-page";
import { RequestModal } from "./components/request-modal";
import { App } from "./components/app-card";
import { mockApps, mockPendingRequests, getRecommendedAppsForRole } from "./data/mock-data";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

type ViewState = "catalog" | "my-apps" | "requests" | "help" | "app-detail";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("catalog");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [apps, setApps] = useState(mockApps);
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [userRole, setUserRole] = useState<"General" | "Engineering">("General");

  const handleTabChange = (tab: string) => {
    setCurrentView(tab as ViewState);
    setSelectedApp(null);
  };

  const handleViewAppDetails = (app: App) => {
    setSelectedApp(app);
    setCurrentView("app-detail");
  };

  const handleRequestAccess = (app: App) => {
    setSelectedApp(app);
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = () => {
    if (!selectedApp) return;

    // Add to pending requests
    const newRequest = {
      id: `req-${Date.now()}`,
      appName: selectedApp.name,
      appIcon: selectedApp.icon,
      requestDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: "pending" as const
    };

    setPendingRequests(prev => [newRequest, ...prev]);
    setIsRequestModalOpen(false);
    
    toast.success(`Access request submitted for ${selectedApp.name}`, {
      description: "Your request will be reviewed within 2-3 business days."
    });

    // Navigate to dashboard to see the request
    setCurrentView("my-apps");
  };

  const handleSwitchRole = () => {
    const newRole = userRole === "General" ? "Engineering" : "General";
    setUserRole(newRole);
    
    // Update apps based on role - simulate different access levels
    setApps(prevApps => {
      return prevApps.map(app => {
        if (newRole === "Engineering") {
          // Engineering role gets access to more technical apps
          if (["Jira", "GitHub"].includes(app.name)) {
            return { ...app, hasAccess: true };
          }
        } else {
          // General role loses access to some technical apps
          if (["Jira", "GitHub"].includes(app.name)) {
            return { ...app, hasAccess: false };
          }
        }
        return app;
      });
    });

    toast.success(`Switched to ${newRole} role`, {
      description: `Your app access has been updated for the ${newRole} role.`
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "catalog":
        return (
          <CatalogPage
            apps={apps}
            onViewAppDetails={handleViewAppDetails}
            onRequestAccess={handleRequestAccess}
          />
        );
      
      case "app-detail":
        return selectedApp ? (
          <AppDetailPage
            app={selectedApp}
            onBack={() => setCurrentView("catalog")}
            onRequestAccess={handleRequestAccess}
          />
        ) : null;
      
      case "my-apps":
      case "requests":
        return (
          <DashboardPage
            apps={apps}
            pendingRequests={pendingRequests}
            userRole={userRole}
            onViewAppDetails={handleViewAppDetails}
            onRequestAccess={handleRequestAccess}
            onSwitchRole={handleSwitchRole}
          />
        );
      
      case "help":
        return (
          <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Help & Support</h1>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">How to Request App Access</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm sm:text-base">
                  <li>Browse the app catalog to find the application you need</li>
                  <li>Click "View Details" to learn more about the app</li>
                  <li>Click "Request Access" if you don't already have it</li>
                  <li>Confirm your request in the modal dialog</li>
                  <li>Wait for manager and IT approval (2-3 business days)</li>
                </ol>
              </div>
              
              <div className="bg-white rounded-lg border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Approval Process</h2>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">
                  Most apps require approval from your manager and IT department. The process typically includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm sm:text-base">
                  <li>Manager approval for business justification</li>
                  <li>IT security review</li>
                  <li>License availability check</li>
                  <li>Training requirements verification</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Contact Support</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Need help? Contact IT Support at{" "}
                  <span className="text-blue-600">support@company.com</span> or call{" "}
                  <span className="text-blue-600">ext. 1234</span>
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        activeTab={currentView === "app-detail" ? "catalog" : currentView}
        onTabChange={handleTabChange}
      />
      
      {renderCurrentView()}

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onConfirm={handleConfirmRequest}
        app={selectedApp}
      />

      <Toaster />
    </div>
  );
}