
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const RECENT_DATA = [
  { label: "Patient Name", value: "Melissa Carter" },
  { label: "Symptoms", value: "Persistent cough, mild fever" },
  { label: "Prescriptions", value: "None reported" },
  { label: "Recorded At", value: "10:38am, Jun 15" },
];

const PatientDataReview = () => (
  <Card className="border-softblue-200 bg-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-softblue-800">
        <FileText className="text-softblue-600" size={22} />
        Recent Patient Data
      </CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="divide-y divide-gray-200">
        {RECENT_DATA.map((data, idx) => (
          <div key={idx} className="py-2 flex justify-between items-center">
            <dt className="font-medium text-softblue-700">{data.label}:</dt>
            <dd className="ml-2 text-gray-700">{data.value}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);

export default PatientDataReview;
