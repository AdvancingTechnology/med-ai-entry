
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Play, Clock, User, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScenarioSetup() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [duration, setDuration] = useState("15");

  const handleStartSimulation = () => {
    // In a real app, this would start the simulation with the configured parameters
    console.log("Starting simulation with:", {
      patientName,
      patientAge,
      chiefComplaint,
      medicalHistory,
      difficulty,
      duration
    });
    // For now, navigate back to training dashboard
    navigate("/train-dashboard");
  };

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-4 pt-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/train-dashboard")}
            className="text-softblue-700 hover:bg-softblue-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Stethoscope className="text-softblue-600" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-softblue-800">In-Person Visit Setup</h1>
            <p className="text-softblue-600">Configure your medical simulation scenario</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="border-softblue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-softblue-700">
                <User className="w-5 h-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName" className="text-softblue-700">Patient Name</Label>
                  <Input
                    id="patientName"
                    placeholder="e.g., Sarah Johnson"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="border-softblue-200"
                  />
                </div>
                <div>
                  <Label htmlFor="patientAge" className="text-softblue-700">Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    placeholder="e.g., 45"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="border-softblue-200"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="chiefComplaint" className="text-softblue-700">Chief Complaint</Label>
                <Input
                  id="chiefComplaint"
                  placeholder="e.g., Chest pain for 2 hours"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="border-softblue-200"
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory" className="text-softblue-700">Medical History (Optional)</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="e.g., History of hypertension, diabetes mellitus type 2..."
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="border-softblue-200 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-softblue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-softblue-700">
                <Clock className="w-5 h-5" />
                Simulation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-softblue-700 text-base font-medium mb-3 block">Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="font-normal">
                      Beginner - Clear symptoms, straightforward diagnosis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="font-normal">
                      Intermediate - Some complexity, requires critical thinking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="font-normal">
                      Advanced - Complex case, multiple possible diagnoses
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-softblue-700 text-base font-medium mb-3 block">Session Duration</Label>
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="10min" />
                    <Label htmlFor="10min" className="font-normal">10 minutes - Quick assessment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="15min" />
                    <Label htmlFor="15min" className="font-normal">15 minutes - Standard consultation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="30min" />
                    <Label htmlFor="30min" className="font-normal">30 minutes - Comprehensive evaluation</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/train-dashboard")}
              className="border-softblue-300 text-softblue-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartSimulation}
              disabled={!patientName || !patientAge || !chiefComplaint}
              className="bg-softblue-600 hover:bg-softblue-700 text-white px-8 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
