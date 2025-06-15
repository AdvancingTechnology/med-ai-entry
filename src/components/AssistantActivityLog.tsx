
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const FAKE_ACTIVITY = [
  {
    time: "10:34am",
    activity: "Assistant: 'Good morning, how can I help you today?'",
  },
  {
    time: "10:36am",
    activity: "Assistant: Collected patient name and symptoms.",
  },
  {
    time: "10:37am",
    activity: "Patient: 'I have a persistent cough.'",
  },
  {
    time: "10:38am",
    activity: "Assistant: Provided basic symptom guidance, collecting more info.",
  },
];

const AssistantActivityLog = () => (
  <Card className="mb-5 bg-white border-softblue-200">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-softblue-800">
        <MessageSquare className="text-softblue-600" size={22} />
        Assistant Activity Log
      </CardTitle>
    </CardHeader>
    <CardContent className="max-h-56 overflow-y-auto p-0">
      <ul className="space-y-2 px-5 py-2">
        {FAKE_ACTIVITY.map((item, idx) => (
          <li key={idx} className="flex gap-2 items-start">
            <span className="text-xs text-softblue-400 mt-0.5 w-14 flex-shrink-0">{item.time}</span>
            <span className="text-gray-700">{item.activity}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default AssistantActivityLog;
