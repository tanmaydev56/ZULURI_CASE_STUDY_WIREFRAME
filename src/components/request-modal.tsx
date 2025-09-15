import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { App } from "./app-card";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  app: App | null;
}

export function RequestModal({ isOpen, onClose, onConfirm, app }: RequestModalProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Access Request</DialogTitle>
          <DialogDescription>
            Review the app details and requirements before submitting your access request.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">{app.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold">{app.name}</h3>
              <p className="text-sm text-gray-600">{app.category}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">
            This app requires Manager + IT approval. Your request will be reviewed within 2-3 business days.
          </p>
          
          {app.accessRequirements && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h4 className="font-medium text-sm mb-2">Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {app.accessRequirements.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}