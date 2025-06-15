
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy session data
const LIVE_SESSIONS = [
  { patient: "Melissa Carter", status: "In Progress", time: "10:40am" },
  { patient: "David Lee", status: "Awaiting Summary", time: "10:35am" },
];

const statusColor = (status: string) => {
  if (status === "In Progress") return "bg-green-400";
  if (status === "Awaiting Summary") return "bg-yellow-400";
  return "bg-gray-400";
};

const LiveSessionsPanel = () => (
  <Card className="bg-white rounded-2xl border-softblue-200 shadow">
    <CardHeader>
      <CardTitle className="text-softblue-800 text-lg font-semibold">Live Sessions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {LIVE_SESSIONS.map((session, idx) => (
          <div key={idx} className="flex items-center justify-between px-2 py-2 rounded bg-softblue-50">
            <div>
              <span className="font-semibold text-softblue-700">{session.patient}</span>
              <span className="ml-2 text-sm text-gray-500">{session.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${statusColor(session.status)}`}></span>
              <span className="text-sm text-gray-700">{session.status}</span>
            </div>
          </div>
        ))}
        {LIVE_SESSIONS.length === 0 && (
          <div className="text-softblue-600 text-center py-2">No active sessions.</div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default LiveSessionsPanel;
