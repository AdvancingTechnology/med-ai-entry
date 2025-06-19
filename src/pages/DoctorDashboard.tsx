
import SidebarNavigation from "@/components/SidebarNavigation";
import LiveSessionsPanel from "@/components/LiveSessionsPanel";
import RecentIntakesCard from "@/components/RecentIntakesCard";
import StartAISessionButton from "@/components/StartAISessionButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {/* Sidebar */}
        <div className="w-64 hidden md:block">
          <SidebarNavigation />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col px-4 py-8 max-w-5xl mx-auto">
          {/* Greeting header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-softblue-800">Welcome back, Dr. James</h1>
            <Button 
              onClick={() => navigate("/train-dashboard")}
              className="bg-softblue-600 hover:bg-softblue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Training
            </Button>
          </div>
          
          {/* Grid layout for panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <LiveSessionsPanel />
            <RecentIntakesCard />
          </div>
          <div className="w-full md:w-1/2 mt-3">
            <StartAISessionButton />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DoctorDashboard;
