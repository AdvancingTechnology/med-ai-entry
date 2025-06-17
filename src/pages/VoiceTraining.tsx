
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function VoiceTraining() {
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [voiceName, setVoiceName] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleTrain = async () => {
    if (!voiceFile || !voiceName) return alert("Upload file and set name.");
    setIsTraining(true);
    // POST to backend or ElevenLabs API endpoint
    // let response = await trainVoice(voiceFile, voiceName);
    // setAudioUrl(response.previewUrl);
    setTimeout(() => {
      setIsTraining(false);
      setAudioUrl("/sample-audio.mp3"); // fake response
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-2 pt-8 flex flex-col items-center animate-fade-in">
      <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-sm border-softblue-200">
        <h2 className="text-2xl font-bold text-softblue-800">🎤 Voice Training Center</h2>

        <div>
          <Label className="text-softblue-700">Upload Sample (WAV/MP3)</Label>
          <Input 
            type="file" 
            accept="audio/*"
            onChange={(e) => setVoiceFile(e.target.files?.[0] || null)}
            className="border-softblue-300"
          />
        </div>

        <div>
          <Label className="text-softblue-700">Voice Name</Label>
          <Input 
            placeholder="e.g., Dr. James – Calm Tone" 
            value={voiceName} 
            onChange={(e) => setVoiceName(e.target.value)}
            className="border-softblue-300"
          />
        </div>

        <Button 
          disabled={isTraining} 
          onClick={handleTrain}
          className="bg-softblue-600 hover:bg-softblue-700 w-full"
        >
          {isTraining ? "Training in Progress..." : "Train Voice with ElevenLabs"}
        </Button>

        {audioUrl && (
          <div className="mt-6">
            <Label className="text-softblue-700">Preview:</Label>
            <audio controls src={audioUrl} className="w-full mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
