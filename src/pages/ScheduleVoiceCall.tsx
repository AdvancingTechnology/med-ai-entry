
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Phone, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ScheduleVoiceCall = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    callType: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phoneNumber || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Call Scheduled!",
      description: `Follow-up call scheduled for ${formData.patientName} on ${formData.date} at ${formData.time}.`,
      variant: "default"
    });

    // Reset form
    setFormData({
      patientName: "",
      phoneNumber: "",
      callType: "",
      date: "",
      time: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-softblue-50 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-softblue-800 flex-1 text-center flex items-center justify-center gap-2">
          <Phone className="text-softblue-400" size={24} />
          Schedule Follow-Up Call
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="rounded-full"
        >
          <Home size={18} className="text-softblue-700" />
        </Button>
      </div>

      <Card className="w-full max-w-2xl rounded-2xl border-softblue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-softblue-700 text-lg">Patient Follow-Up Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSchedule} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="callType">Call Type</Label>
              <Select value={formData.callType} onValueChange={(value) => handleInputChange("callType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select call type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="follow-up">Follow-up Consultation</SelectItem>
                  <SelectItem value="results">Test Results Discussion</SelectItem>
                  <SelectItem value="medication">Medication Review</SelectItem>
                  <SelectItem value="wellness">Wellness Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any specific topics to discuss or patient concerns..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="rounded-lg border-softblue-300 text-softblue-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-lg bg-softblue-600 hover:bg-softblue-700 text-white font-semibold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-2xl">
        <Card className="rounded-2xl border-softblue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Upcoming Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-softblue-50 rounded-lg">
                <div>
                  <p className="font-medium text-softblue-800">Sarah Johnson</p>
                  <p className="text-sm text-softblue-600">Follow-up Consultation</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-softblue-800">Tomorrow, 2:30 PM</p>
                  <p className="text-sm text-softblue-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-softblue-50 rounded-lg">
                <div>
                  <p className="font-medium text-softblue-800">Michael Chen</p>
                  <p className="text-sm text-softblue-600">Test Results Discussion</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-softblue-800">Friday, 10:00 AM</p>
                  <p className="text-sm text-softblue-600">(555) 987-6543</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleVoiceCall;
