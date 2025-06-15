
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PlusCircle, UserCheck, Stethoscope, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DEMO_SIMULATIONS = [
  {
    date: "2025-06-14",
    type: "In-Person",
    chiefComplaint: "Shortness of breath",
    status: "Completed",
  },
  {
    date: "2025-06-12",
    type: "Telemedicine",
    chiefComplaint: "Abdominal pain",
    status: "Pending Review",
  },
  {
    date: "2025-06-10",
    type: "In-Person",
    chiefComplaint: "Follow-up Hypertension",
    status: "Completed",
  },
];

export default function TrainingDashboard() {
  const [showSimModal, setShowSimModal] = useState(false);
  const navigate = useNavigate();
  const aiConfidence = 85; // Placeholder value for AI readiness

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-2 pt-8 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-softblue-800 flex items-center gap-2">
            <UserCheck className="text-softblue-400" size={32} />
            AI Training Dashboard
          </h1>
          <p className="mt-2 text-softblue-700 max-w-lg">
            Manage your simulation sessions and monitor your AI training progress.
          </p>
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
            <CardHeader className="pb-4 flex flex-col gap-0">
              <div className="flex items-center gap-3">
                <CardTitle className="text-softblue-700 text-lg">Recent Simulations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEMO_SIMULATIONS.map((sim, i) => (
                    <TableRow key={i}>
                      <TableCell>{sim.date}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          {sim.type === "In-Person" ? (
                            <Stethoscope className="w-4 h-4 text-softblue-400" />
                          ) : (
                            <Video className="w-4 h-4 text-green-400" />
                          )}
                          {sim.type}
                        </span>
                      </TableCell>
                      <TableCell>{sim.chiefComplaint}</TableCell>
                      <TableCell>
                        {sim.status === "Completed" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Completed</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending Review</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card className="rounded-2xl border-softblue-200 shadow-sm bg-white flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-8">
            <div className="flex flex-col gap-3 w-full md:w-2/3">
              <h2 className="font-semibold text-softblue-700">AI Confidence Level</h2>
              <Progress value={aiConfidence} className={aiConfidence > 90 ? "bg-green-200" : ""} />
              <span className={`text-xs font-mono ${aiConfidence > 90 ? "text-green-700" : "text-softblue-600"}`}>{aiConfidence}% Ready</span>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <Button
                variant="ghost"
                className="text-softblue-700 hover:bg-softblue-100"
                onClick={() => navigate("/notifications")}
              >
                View Notifications
              </Button>
              <Button
                variant="ghost"
                className="text-softblue-700 hover:bg-softblue-100"
                onClick={() => navigate("/settings")}
              >
                AI Agent Settings
              </Button>
            </div>
          </Card>
        </section>
      </main>

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
                onClick={() => navigate("/scenario-setup")}
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
    </div>
  );
}
