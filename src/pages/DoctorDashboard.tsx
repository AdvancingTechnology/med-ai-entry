
import SidebarNavigation from "@/components/SidebarNavigation";
import LiveSessionsPanel from "@/components/LiveSessionsPanel";
import RecentIntakesCard from "@/components/RecentIntakesCard";
import StartAISessionButton from "@/components/StartAISessionButton";
import { SidebarProvider } from "@/components/ui/sidebar";

// Removed MainMenuBar from use

const DoctorDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {/* Sidebar */}
        <div className="w-64 hidden md:block pt-12">
          <SidebarNavigation />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col px-4 py-8 max-w-5xl mx-auto pt-16">
          {/* Greeting header */}
          <h1 className="text-2xl md:text-3xl font-bold text-softblue-800 mb-6">Welcome back, Dr. James</h1>
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

