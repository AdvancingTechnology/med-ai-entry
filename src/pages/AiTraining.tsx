
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export default function AiTraining() {
  const [trainingData, setTrainingData] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const navigate = useNavigate();

  const handleTrain = async () => {
    if (!trainingData.trim()) return alert("Please enter training data.");
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      alert("AI training completed!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-softblue-50 pb-12 px-2 pt-8 flex flex-col items-center animate-fade-in">
      <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-sm border-softblue-200">
        <h2 className="text-2xl font-bold text-softblue-800">🤖 Train Your AI Assistant</h2>

        <div>
          <Label className="text-softblue-700">Training Data</Label>
          <Textarea 
            placeholder="Enter medical knowledge, procedures, or conversation examples..."
            value={trainingData}
            onChange={(e) => setTrainingData(e.target.value)}
            className="border-softblue-300 min-h-32"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            disabled={isTraining} 
            onClick={handleTrain}
            className="bg-softblue-600 hover:bg-softblue-700 flex-1"
          >
            {isTraining ? "Training in Progress..." : "Train AI Assistant"}
          </Button>

          <Button 
            onClick={() => navigate('/voice-training')}
            variant="outline"
            className="border-softblue-300 text-softblue-700 hover:bg-softblue-50 flex-1"
          >
            🎤 Voice Training
          </Button>
        </div>
      </div>
    </div>
  );
}
