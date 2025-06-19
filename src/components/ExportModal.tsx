
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
import { useToast } from "@/hooks/use-toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emrTargets = [
  {
    id: "athena",
    name: "Athena Health",
    description: "Export directly to Athena Health EMR system with full integration support.",
  },
  {
    id: "cerner",
    name: "Cerner",
    description: "Export to Cerner EMR with compatible formatting and data mapping.",
  },
  {
    id: "custom",
    name: "Custom API",
    description: "Export to your custom API endpoint with configurable data format.",
  },
];

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!selectedTarget) {
      toast({
        title: "Selection Required",
        description: "Please select an EMR target before exporting.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export Successful!",
        description: `Data exported to ${emrTargets.find(t => t.id === selectedTarget)?.name} successfully.`,
        variant: "default",
      });
      
      onClose();
      setSelectedTarget("");
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Export failed. Please try again.",
        variant: "destructive",
      });
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
