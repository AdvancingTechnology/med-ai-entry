
import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";

const StartAISessionButton = () => {
  const handleStart = () => {
    // Simulate starting a session (replace with real logic later)
    alert("New AI session started!");
  };

  return (
    <Button
      className="w-full bg-softblue-600 hover:bg-softblue-700 text-white text-lg font-semibold rounded-xl py-5 flex items-center justify-center gap-2 shadow"
      onClick={handleStart}
    >
      <Monitor className="mr-2" size={22} />
      Start New AI Session
    </Button>
  );
};

export default StartAISessionButton;
