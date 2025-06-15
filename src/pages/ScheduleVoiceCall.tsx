
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";

// Demo patient list (replace with real data or API in production)
const PATIENTS = [
  { id: "1", name: "Melissa Carter" },
  { id: "2", name: "Anna Green" },
  { id: "3", name: "Jose Martinez" },
];

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = ["00", "15", "30", "45"];
const PERIODS = ["AM", "PM"];

const getPreviewMessage = (patientName: string, date: Date | undefined, hour: string, minute: string, period: string, reason: string) => {
  if (!patientName) return "Select a patient to preview the AI's call script.";
  if (!date) return "Choose a call date to preview the AI's message.";
  const dateStr = format(date, "PPPP");
  let timeStr = "";
  if (hour && period) timeStr = `${hour}:${minute} ${period}`;
  else timeStr = "";
  return `Hello, this is Dr. James' assistant calling for ${patientName}. Your follow-up is scheduled for ${dateStr}${timeStr ? ` at ${timeStr}` : ""}.${reason ? "\n\n" + reason : ""}`;
};

const ScheduleVoiceCall: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("00");
  const [period, setPeriod] = useState<string>("AM");
  const [reason, setReason] = useState<string>("");

  // On form submit, connect to backend or scheduling API
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just show a toast or navigate back
    window.alert("Voice call scheduled! (This is a demo.)");
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Preview helper
  const patientObj = PATIENTS.find((p) => p.id === selectedPatient);
  const previewMessage = getPreviewMessage(
    patientObj?.name || "",
    date,
    hour,
    minute,
    period,
    reason
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-softblue-50 px-2 py-8">
      <div className="w-full max-w-2xl flex items-center mb-6">
        <Button variant="ghost" className="rounded-full mr-4" onClick={() => navigate("/dashboard")}>
          &larr; Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-softblue-800 flex-1 text-center">
          Schedule AI Follow-up Call
        </h1>
        <div className="w-32" />
      </div>
      <form onSubmit={handleSchedule} className="w-full max-w-2xl space-y-6">
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Follow-up Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-5">
                {/* Patient Selector */}
                <div>
                  <label className="block font-medium text-softblue-800 mb-1">Patient</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATIENTS.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Date & Time */}
                <div>
                  <label className="block font-medium text-softblue-800 mb-1">Date</label>
                  <div className="relative">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto bg-white rounded-lg border border-softblue-200"
                      disabled={(d) => d < new Date()}
                    />
                    <CalendarIcon size={18} className="absolute top-4 right-4 text-softblue-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-softblue-800 mb-1">Time</label>
                  <div className="flex gap-2 items-center">
                    <select
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="bg-white border border-softblue-200 rounded px-2 py-1"
                    >
                      <option value="">HH</option>
                      {HOURS.map((h) => (
                        <option key={h} value={h.toString()}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      className="bg-white border border-softblue-200 rounded px-2 py-1"
                    >
                      {MINUTES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="bg-white border border-softblue-200 rounded px-2 py-1"
                    >
                      {PERIODS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <ClockIcon size={18} className="ml-2 text-softblue-400" />
                  </div>
                </div>
              </div>
              {/* Instructions */}
              <div className="flex-1">
                <label className="block font-medium text-softblue-800 mb-1">Call Reason / AI Instructions</label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the reason for the call or what the AI should say…"
                  className="resize-none border-softblue-200 bg-white"
                  rows={8}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Message Preview */}
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Outbound Call Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-softblue-100 text-softblue-900 p-4 rounded-md whitespace-pre-line" style={{minHeight: 80}}>
              {previewMessage}
            </div>
          </CardContent>
        </Card>
        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" className="rounded-lg border-softblue-300 text-softblue-700" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="default" className="rounded-lg bg-softblue-600 hover:bg-softblue-700 text-white font-semibold">
            Schedule Voice Call
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleVoiceCall;
