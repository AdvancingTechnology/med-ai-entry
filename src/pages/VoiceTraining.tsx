
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Mic, Play, Pause, CheckCircle, AlertCircle } from "lucide-react";

export default function VoiceTraining() {
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [voiceName, setVoiceName] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trainedVoices, setTrainedVoices] = useState([
    { id: 1, name: "Dr. Sarah - Calm & Professional", status: "ready", createdAt: "2024-01-15" },
    { id: 2, name: "Dr. Michael - Warm & Reassuring", status: "ready", createdAt: "2024-01-10" }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVoiceFile(file);
    }
  };

  const handleTrain = async () => {
    if (!voiceFile || !voiceName) {
      alert("Please upload an audio file and enter a voice name.");
      return;
    }
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const progressInterval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsTraining(false);
          setAudioUrl("/sample-audio.mp3");
          setTrainedVoices(prev => [...prev, {
            id: Date.now(),
            name: voiceName,
            status: "ready",
            createdAt: new Date().toISOString().split('T')[0]
          }]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-4 pt-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-softblue-800 mb-2">🎤 Voice Training Center</h1>
          <p className="text-softblue-600">Create custom AI voices for your medical assistant</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Section */}
          <Card className="border-softblue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-softblue-800 flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Train New Voice
              </CardTitle>
              <CardDescription>
                Upload a high-quality audio sample (at least 1 minute) to create a custom voice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-softblue-700">Audio File (WAV/MP3)</Label>
                <div className="relative">
                  <Input 
                    type="file" 
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="border-softblue-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-softblue-100 file:text-softblue-700 hover:file:bg-softblue-200"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-softblue-400" />
                </div>
                {voiceFile && (
                  <p className="text-sm text-softblue-600">
                    Selected: {voiceFile.name} ({(voiceFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-softblue-700">Voice Name</Label>
                <Input 
                  placeholder="e.g., Dr. James – Calm & Professional" 
                  value={voiceName} 
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="border-softblue-300"
                />
              </div>

              <Button 
                disabled={isTraining || !voiceFile || !voiceName} 
                onClick={handleTrain}
                className="w-full bg-softblue-600 hover:bg-softblue-700"
              >
                {isTraining ? `Training... ${trainingProgress}%` : "Train Voice with ElevenLabs"}
              </Button>

              {isTraining && (
                <div className="w-full bg-softblue-200 rounded-full h-2">
                  <div 
                    className="bg-softblue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trainingProgress}%` }}
                  />
                </div>
              )}

              {audioUrl && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Training Complete!</span>
                  </div>
                  <Label className="text-green-700">Preview Your Voice:</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayback}
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <audio controls src={audioUrl} className="flex-1" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trained Voices Section */}
          <Card className="border-softblue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-softblue-800">Your Trained Voices</CardTitle>
              <CardDescription>
                Manage and use your custom AI voices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trainedVoices.map((voice) => (
                  <div key={voice.id} className="p-3 border border-softblue-200 rounded-lg hover:bg-softblue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-softblue-800">{voice.name}</h4>
                        <p className="text-sm text-softblue-600">Created: {voice.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {voice.status === "ready" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                        <Button variant="outline" size="sm" className="text-softblue-700">
                          Use Voice
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="border-softblue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-softblue-800">💡 Training Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-softblue-50 rounded-lg">
                <h4 className="font-medium text-softblue-800 mb-1">Audio Quality</h4>
                <p className="text-softblue-600">Use clear, noise-free recordings in WAV or high-quality MP3 format</p>
              </div>
              <div className="p-3 bg-softblue-50 rounded-lg">
                <h4 className="font-medium text-softblue-800 mb-1">Duration</h4>
                <p className="text-softblue-600">Provide at least 1-2 minutes of speech for best results</p>
              </div>
              <div className="p-3 bg-softblue-50 rounded-lg">
                <h4 className="font-medium text-softblue-800 mb-1">Content</h4>
                <p className="text-softblue-600">Include varied medical terminology and conversational phrases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
