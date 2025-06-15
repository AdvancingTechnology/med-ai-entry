
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, MessageSquare, Check, Bell, BellOff } from "lucide-react";

const AssistantControls = () => {
  const [running, setRunning] = useState(false);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleFollowUp = () => {
    alert("Follow-up question triggered.");
  };

  return (
    <div className="bg-softblue rounded-2xl p-5 mb-4 flex flex-col gap-3 shadow">
      <div className="flex gap-2 items-center mb-1">
        <Monitor className="text-softblue-700" size={22} />
        <span className="font-semibold text-softblue-800 text-lg">Assistant Controls</span>
      </div>
      <div className="flex gap-3 mt-1 mb-2">
        <Button 
          className="bg-softblue-600 hover:bg-softblue-800 text-white font-semibold"
          onClick={handleStart}
          disabled={running}
        >
          <Bell className="mr-1" size={18} /> Start Assistant
        </Button>
        <Button 
          className="bg-gray-200 hover:bg-gray-300 text-softblue-800 font-semibold"
          onClick={handleStop}
          disabled={!running}
        >
          <BellOff className="mr-1" size={18}/> Stop Assistant
        </Button>
        <Button 
          className="bg-softblue-500 hover:bg-softblue-700 text-white font-semibold"
          onClick={handleFollowUp}
        >
          <MessageSquare className="mr-1" size={18}/> Ask Follow-up
        </Button>
      </div>
      <p className="text-softblue-700 text-sm">
        Status: <span className={"font-semibold " + (running ? "text-green-700" : "text-gray-500")}>{running ? "Running" : "Stopped"}</span>
      </p>
    </div>
  );
};

export default AssistantControls;
