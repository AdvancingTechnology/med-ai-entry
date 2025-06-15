
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const DoctorNotes = () => {
  const [notes, setNotes] = React.useState(
    "Follow-up in 2 weeks for blood pressure check. Review allergy plan during spring season."
  );

  return (
    <div className="bg-white rounded-2xl p-5 shadow border border-softblue-200">
      <h3 className="text-lg font-semibold text-softblue-800 font-sans mb-2">Notes</h3>
      <Textarea
        className="font-sans text-base text-gray-800 bg-softblue-100 rounded-xl px-3 py-2 min-h-[84px] border border-softblue-200 focus:ring-softblue-400"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        aria-label="Doctor's notes"
        spellCheck={false}
        placeholder="Add or update notes here…"
      />
    </div>
  );
};

export default DoctorNotes;
