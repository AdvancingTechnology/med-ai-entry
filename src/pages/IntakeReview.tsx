
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PATIENT_DATA = {
  name: "Melissa Carter",
  date: "2025-06-15",
  time: "10:38am",
  symptoms: "Cough, mild fever, persistent throat irritation",
  history: "No significant prior illnesses. No hospitalizations. Nonsmoker.",
  medications: "None reported.",
  notes: "Voice seems slightly hoarse. No immediate red flags. Consider follow-up if fever persists.",
};

const TRANSCRIPT = [
  {
    type: "ai",
    text: "Hello Melissa, I’m your healthcare assistant. Can you describe your current symptoms?",
    audio: "/audio/ai-1.mp3",
    timestamp: "10:38:12",
  },
  {
    type: "patient",
    text: "I have a cough and a mild fever since yesterday.",
    audio: "/audio/patient-1.mp3",
    timestamp: "10:38:18",
  },
  {
    type: "ai",
    text: "Do you have any other symptoms? For example, shortness of breath or chest pain?",
    audio: "/audio/ai-2.mp3",
    timestamp: "10:38:24",
  },
  {
    type: "patient",
    text: "No, just the cough and fever.",
    audio: "/audio/patient-2.mp3",
    timestamp: "10:38:29",
  },
  {
    type: "ai",
    text: "Are you taking any medications at this time?",
    audio: "/audio/ai-3.mp3",
    timestamp: "10:38:33",
  },
  {
    type: "patient",
    text: "No, nothing right now.",
    audio: "/audio/patient-3.mp3",
    timestamp: "10:38:37",
  },
];

const IntakeReview: React.FC = () => {
  const navigate = useNavigate();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Handle playing only one audio at a time
  const handlePlay = (audioUrl: string, i: number) => {
    if (currentAudio) {
      currentAudio.pause();
      setPlayingIndex(null);
    }
    const audio = new Audio(audioUrl);
    setCurrentAudio(audio);
    setPlayingIndex(i);
    audio.play();
    audio.onended = () => setPlayingIndex(null);
    audio.onerror = () => setPlayingIndex(null);
  };

  return (
    <div className="min-h-screen bg-softblue-50 py-6 px-2 flex flex-col items-center">
      {/* Top bar */}
      <div className="w-full max-w-3xl flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          className="flex gap-2 items-center rounded-full"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} className="text-softblue-700" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-softblue-800 flex-1 text-center">
          Patient Intake Review
        </h1>
        {/* Spacer */}
        <div className="w-28" />
      </div>

      <Card className="w-full max-w-3xl rounded-2xl border-softblue-200 shadow mb-6">
        <CardHeader>
          <CardTitle className="text-softblue-800 text-xl">
            {PATIENT_DATA.name}
            <span className="ml-4 text-base font-normal text-gray-500">
              {PATIENT_DATA.date}, {PATIENT_DATA.time}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline transcript={TRANSCRIPT} handlePlay={handlePlay} playingIndex={playingIndex} />
        </CardContent>
      </Card>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700">{PATIENT_DATA.symptoms}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700">{PATIENT_DATA.history}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700">{PATIENT_DATA.medications}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700">{PATIENT_DATA.notes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 justify-end">
        <Button variant="outline" className="flex-1 md:flex-none rounded-lg border-softblue-300 text-softblue-700">
          Request Clarification from AI
        </Button>
        <Button variant="secondary" className="flex-1 md:flex-none rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border border-yellow-300">
          Mark for Follow-up
        </Button>
        <Button variant="default" className="flex-1 md:flex-none rounded-lg bg-softblue-600 hover:bg-softblue-700 text-white font-semibold">
          Send to Chart
        </Button>
      </div>
    </div>
  );
};

// Timeline/Transcript component for the AI-patient conversation
const Timeline: React.FC<{
  transcript: typeof TRANSCRIPT;
  handlePlay: (audioUrl: string, i: number) => void;
  playingIndex: number | null;
}> = ({ transcript, handlePlay, playingIndex }) => (
  <ul className="space-y-4">
    {transcript.map((entry, i) => (
      <li key={i} className="flex gap-3 items-start">
        <div
          className={`rounded-full w-7 h-7 flex items-center justify-center font-bold text-white
            ${entry.type === "ai" ? "bg-softblue-500" : "bg-gray-400"}
          `}
        >
          {entry.type === "ai" ? "AI" : "P"}
        </div>
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-softblue-700">
              {entry.type === "ai" ? "Assistant" : "Patient"}
            </span>
            <span className="text-xs text-gray-400">{entry.timestamp}</span>
            {entry.audio && (
              <Button
                variant="ghost"
                size="icon"
                className={`ml-2 ${playingIndex === i ? "bg-softblue-200" : ""}`}
                onClick={() => handlePlay(entry.audio, i)}
                aria-label={`Play audio for ${entry.type} message`}
              >
                <Play size={16} className={`${playingIndex === i ? "animate-pulse" : ""} text-softblue-800`} />
              </Button>
            )}
          </div>
          <div className="text-gray-800">{entry.text}</div>
        </div>
      </li>
    ))}
  </ul>
);

export default IntakeReview;
