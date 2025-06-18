
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Play, Clock, User, Video, Wifi, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TelemedicineSetup() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [duration, setDuration] = useState("15");
  const [connectionQuality, setConnectionQuality] = useState("good");

  const handleStartSimulation = () => {
    console.log("Starting telemedicine simulation with:", {
      patientName,
      patientAge,
      chiefComplaint,
      medicalHistory,
      difficulty,
      duration,
      connectionQuality
    });
    // Navigate back to training dashboard
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
          <Video className="text-green-600" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-softblue-800">Telemedicine Visit Setup</h1>
            <p className="text-softblue-600">Configure your virtual consultation scenario</p>
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
                    placeholder="e.g., Maria Rodriguez"
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
                    placeholder="e.g., 32"
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
                  placeholder="e.g., Persistent headaches for 1 week"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="border-softblue-200"
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory" className="text-softblue-700">Medical History (Optional)</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="e.g., Previous migraines, takes daily vitamins..."
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
                <Monitor className="w-5 h-5" />
                Telemedicine Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-softblue-700 text-base font-medium mb-3 block">Connection Quality</Label>
                <RadioGroup value={connectionQuality} onValueChange={setConnectionQuality}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent" className="font-normal">
                      Excellent - Crystal clear video and audio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good" className="font-normal">
                      Good - Minor occasional delays or quality drops
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor" className="font-normal">
                      Poor - Frequent interruptions, audio/video issues
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-softblue-700 text-base font-medium mb-3 block">Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner-tele" />
                    <Label htmlFor="beginner-tele" className="font-normal">
                      Beginner - Simple virtual consultation, clear symptoms
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate-tele" />
                    <Label htmlFor="intermediate-tele" className="font-normal">
                      Intermediate - Requires virtual examination techniques
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced-tele" />
                    <Label htmlFor="advanced-tele" className="font-normal">
                      Advanced - Complex case with technology challenges
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-softblue-700 text-base font-medium mb-3 block">Session Duration</Label>
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="10min-tele" />
                    <Label htmlFor="10min-tele" className="font-normal">10 minutes - Quick virtual check-in</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="15min-tele" />
                    <Label htmlFor="15min-tele" className="font-normal">15 minutes - Standard telemedicine visit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="30min-tele" />
                    <Label htmlFor="30min-tele" className="font-normal">30 minutes - Comprehensive virtual consultation</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Wifi className="w-5 h-5" />
                Telemedicine Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-green-700 space-y-2 text-sm">
                <li>• Practice establishing rapport through the screen</li>
                <li>• Learn to guide patients for self-examination</li>
                <li>• Master virtual communication techniques</li>
                <li>• Handle technical difficulties professionally</li>
              </ul>
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
              className="bg-green-600 hover:bg-green-700 text-white px-8 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Telemedicine Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
