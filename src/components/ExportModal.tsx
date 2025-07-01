
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWebhookIntegration } from "@/hooks/useWebhookIntegration";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData?: any;
}

const emrTargets = [
  {
    id: "athena",
    name: "Athena Health",
    description: "Export directly to Athena Health EMR system with full integration support and FHIR formatting.",
  },
  {
    id: "cerner",
    name: "Cerner",
    description: "Export to Cerner EMR with compatible formatting and data mapping for seamless integration.",
  },
  {
    id: "custom",
    name: "Custom API",
    description: "Export to your custom API endpoint with configurable data format and webhook support.",
  },
];

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, sessionData }) => {
  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const { send: sendToExportWebhook } = useWebhookIntegration("export-event");

  const handleExport = async () => {
    if (!selectedTarget) {
      return;
    }

    setIsExporting(true);
    
    try {
      await sendToExportWebhook({
        target: selectedTarget,
        sessionData: sessionData || {},
        exportType: 'emr',
      });
      
      onClose();
      setSelectedTarget("");
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setIsExporting(false);
    }
  };

  const handleClose = () => {
    if (!isExporting) {
      onClose();
      setSelectedTarget("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-softblue-800">Export to EMR System</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedTarget} onValueChange={setSelectedTarget}>
            <div className="space-y-4">
              {emrTargets.map((target) => (
                <div key={target.id} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={target.id} 
                    id={target.id}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor={target.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {target.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {target.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExport}
            disabled={!selectedTarget || isExporting}
            className="bg-softblue-600 hover:bg-softblue-700"
          >
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
