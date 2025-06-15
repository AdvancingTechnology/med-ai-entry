import DoctorProfile from "@/components/DoctorProfile";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import DoctorNotes from "@/components/DoctorNotes";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-2 py-6">
      <div className="w-full max-w-5xl flex flex-col gap-8 md:gap-6 md:flex-row">
        {/* Left panel: Profile + Start New Intake + Patient Summary + Notes */}
        <div className="flex flex-col gap-6 md:w-1/3 min-w-[260px]">
          <DoctorProfile />
          <Button
            variant="default"
            className="w-full flex items-center gap-2 text-lg font-semibold rounded-xl bg-softblue-600 hover:bg-softblue-800 text-white py-3"
            onClick={() => navigate("/intake")}
            aria-label="Start New Intake"
          >
            <span role="img" aria-label="Pencil">📝</span>
            Start New Intake
          </Button>
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
};

export default DoctorDashboard;
