
const PatientSummaryCard = () => (
  <div className="bg-white rounded-2xl px-5 py-4 shadow flex flex-col gap-2 border border-softblue-200">
    <h3 className="text-lg font-semibold text-softblue-800 font-sans mb-2">Patient Summary</h3>
    <div className="flex flex-col gap-1">
      <div>
        <span className="font-semibold text-gray-700">Name:</span>
        <span className="ml-2 text-gray-600">Melissa Carter</span>
      </div>
      <div>
        <span className="font-semibold text-gray-700">Age:</span>
        <span className="ml-2 text-gray-600">48</span>
      </div>
      <div>
        <span className="font-semibold text-gray-700">Medical History:</span>
        <span className="ml-2 text-gray-600">Hypertension, Seasonal Allergies, Former Smoker</span>
      </div>
    </div>
  </div>
);

export default PatientSummaryCard;
