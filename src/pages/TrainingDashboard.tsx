import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useWebhookIntegration } from "@/hooks/useWebhookIntegration";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, UserCheck, Stethoscope, Video, ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TrainingDashboard() {
  const [hpi, setHpi] = useState("");
  const [actions, setActions] = useState<string[]>([""]);
  const { send } = useWebhookIntegration("training-event");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSimModal, setShowSimModal] = useState(false);
  const aiConfidence = 85; // Placeholder value for AI readiness

  const saveSession = async () => {
    if (!hpi.trim()) return toast({ title: "Enter an HPI first", variant: "destructive" });
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hpiSample: hpi,
          actions: actions.filter(action => action.trim().length > 0),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      toast({ title: "Sample saved!" });
      setHpi("");
      setActions([""]);
    } catch (e) {
      console.error(e);
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleViewNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications at this time.",
      variant: "default"
    });
  };

  const handleAISettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-2 pt-8 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-softblue-800 flex items-center gap-2">
              <UserCheck className="text-softblue-400" size={32} />
              AI Training Dashboard
            </h1>
            <p className="mt-2 text-softblue-700 max-w-lg">
              Manage your simulation sessions and train your AI with sample HPIs.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            onClick={() => setShowSimModal(true)}
            type="button"
            size="lg"
          >
            <PlusCircle className="mr-2" />
            Start New Simulation
          </Button>
          <Button
            variant="outline"
            className="rounded-lg border-softblue-300 text-softblue-700"
            onClick={() => navigate("/train-ai")}
            type="button"
          >
            Go to Training
          </Button>
        </div>
      </div>
      <main className="w-full max-w-4xl flex flex-col gap-8">
        <section>
          <Card className="rounded-2xl border-softblue-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-softblue-700 text-lg">HPI Training Sample</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="w-full p-2 border rounded mb-4"
                rows={6}
                value={hpi}
                onChange={e => setHpi(e.target.value)}
                placeholder="e.g., 52yo male with chest pain…"
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border-softblue-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-softblue-700 text-lg">Typical Actions & Responses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actions.map((action, i) => (
                <Input
                  key={i}
                  className="w-full p-2 border rounded"
                  value={action}
                  onChange={e => {
                    const a = [...actions];
                    a[i] = e.target.value;
                    setActions(a);
                  }}
                  placeholder="e.g., Order CBC…"
                />
              ))}
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-800" 
                onClick={() => setActions([...actions, ""])}
              >
                + Add More
              </Button>
            </CardContent>
          </Card>
        </section>

        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold self-start"
          onClick={saveSession}
          size="lg"
        >
          <Save className="mr-2" />
          Save Training Session
        </Button>

        {/* Simulation modal */}
        {showSimModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6 w-[95vw] max-w-xs text-center items-center">
              <h3 className="text-lg font-bold text-softblue-800">Start New Simulation</h3>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  className="bg-softblue-600 hover:bg-softblue-700 w-full rounded-lg text-white font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate("/scenario-setup")}
                >
                  <Stethoscope /> In-Person Visit
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 w-full rounded-lg text-white font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate("/telemedicine-setup")}
                >
                  <Video /> Telemedicine
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full border-softblue-300 mt-2"
                onClick={() => setShowSimModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
