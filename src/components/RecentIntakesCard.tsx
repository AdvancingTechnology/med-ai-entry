
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy recent intakes
const RECENT_INTAKES = [
  {
    patient: "Melissa Carter",
    intakeTime: "10:38am, Jun 15",
    summary: "Cough, mild fever. No current prescriptions.",
  },
  {
    patient: "David Lee",
    intakeTime: "10:32am, Jun 15",
    summary: "Shortness of breath. On asthma medication.",
  },
];

const RecentIntakesCard = () => (
  <Card className="bg-white rounded-2xl border-softblue-200 shadow">
    <CardHeader>
      <CardTitle className="text-softblue-800 text-lg font-semibold">Recent Intakes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="divide-y divide-gray-200">
        {RECENT_INTAKES.map((intake, idx) => (
          <div key={idx} className="py-3">
            <div className="flex justify-between">
              <span className="font-semibold text-softblue-700">{intake.patient}</span>
              <span className="text-sm text-gray-500">{intake.intakeTime}</span>
            </div>
            <p className="text-gray-700 mt-1">{intake.summary}</p>
          </div>
        ))}
        {RECENT_INTAKES.length === 0 && (
          <div className="text-softblue-600 py-2 text-center">No recent intakes.</div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default RecentIntakesCard;
