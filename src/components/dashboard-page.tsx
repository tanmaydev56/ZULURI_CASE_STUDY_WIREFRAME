import { AppCard, App } from "./app-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface PendingRequest {
  id: string;
  appName: string;
  appIcon: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

interface DashboardPageProps {
  apps: App[];
  pendingRequests: PendingRequest[];
  userRole: "General" | "Engineering";
  onViewAppDetails: (app: App) => void;
  onRequestAccess: (app: App) => void;
  onSwitchRole: () => void;
}

export function DashboardPage({ 
  apps, 
  pendingRequests, 
  userRole, 
  onViewAppDetails, 
  onRequestAccess,
  onSwitchRole 
}: DashboardPageProps) {
  const myApps = apps.filter(app => app.hasAccess);
  const recommendedApps = apps.filter(app => !app.hasAccess).slice(0, 6);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back! Here's your app overview.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600">Current Role</p>
              <p className="font-semibold">{userRole}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={onSwitchRole}
              className="w-full sm:w-auto text-sm"
            >
              Switch to {userRole === "General" ? "Engineering" : "General"} Role
            </Button>
          </div>
        </div>

        {/* My Apps Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">My Apps ({myApps.length})</h2>
          {myApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
              {myApps.map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  onViewDetails={onViewAppDetails}
                  onRequestAccess={onRequestAccess}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm">
              <p className="text-gray-500 mb-4">You don't have access to any apps yet.</p>
              <p className="text-sm text-gray-400">Browse the catalog to request access to apps you need.</p>
            </div>
          )}
        </section>

        {/* Pending Requests Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Pending Requests ({pendingRequests.length})</h2>
          {pendingRequests.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm">
              {pendingRequests.map((request, index) => (
                <div 
                  key={request.id} 
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    index !== pendingRequests.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span>{request.appIcon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{request.appName}</h3>
                      <p className="text-sm text-gray-600">Requested on {request.requestDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    {getStatusIcon(request.status)}
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm">
              <p className="text-gray-500">No pending requests.</p>
            </div>
          )}
        </section>

        {/* Recommended Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recommended for You - {userRole} Role
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {recommendedApps.map(app => (
              <AppCard
                key={app.id}
                app={app}
                onViewDetails={onViewAppDetails}
                onRequestAccess={onRequestAccess}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}