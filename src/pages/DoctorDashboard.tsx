
import DoctorProfile from "@/components/DoctorProfile";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import DoctorNotes from "@/components/DoctorNotes";
import ChatInterface from "@/components/ChatInterface";

const DoctorDashboard = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center px-2 py-6">
    <div className="w-full max-w-5xl flex flex-col gap-8 md:gap-6 md:flex-row">
      {/* Left panel: Profile + Patient Summary + Notes */}
      <div className="flex flex-col gap-6 md:w-1/3 min-w-[260px]">
        <DoctorProfile />
        <PatientSummaryCard />
        <DoctorNotes />
      </div>
      {/* Chat Main Panel */}
      <div className="flex-1 md:w-2/3">
        <ChatInterface />
      </div>
    </div>
  </div>
);

export default DoctorDashboard;
