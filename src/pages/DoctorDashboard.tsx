
import SidebarNavigation from "@/components/SidebarNavigation";
import LiveSessionsPanel from "@/components/LiveSessionsPanel";
import RecentIntakesCard from "@/components/RecentIntakesCard";
import StartAISessionButton from "@/components/StartAISessionButton";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <SidebarNavigation />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-8 max-w-5xl mx-auto">
        {/* Responsive sidebar show/hide button could be added for mobile */}
        {/* Greeting header */}
        <h1 className="text-2xl md:text-3xl font-bold text-softblue-800 mb-6">Welcome back, Dr. James</h1>
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
  );
};

export default DoctorDashboard;
