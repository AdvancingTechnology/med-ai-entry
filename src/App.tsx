
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/DoctorDashboard";
import IntakeReview from "./pages/IntakeReview";
import ScheduleVoiceCall from "./pages/ScheduleVoiceCall";
import Settings from "./pages/Settings";
import AiTraining from "./pages/AiTraining";
import TrainingDashboard from "./pages/TrainingDashboard";
import VoiceTraining from "./pages/VoiceTraining";
import ScenarioSetup from "./pages/ScenarioSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DoctorDashboard />} />
          <Route path="/intake-review" element={<IntakeReview />} />
          <Route path="/schedule-call" element={<ScheduleVoiceCall />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/train-ai" element={<AiTraining />} />
          <Route path="/train-dashboard" element={<TrainingDashboard />} />
          <Route path="/voice-training" element={<VoiceTraining />} />
          <Route path="/scenario-setup" element={<ScenarioSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
