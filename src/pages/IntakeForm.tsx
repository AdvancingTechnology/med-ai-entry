
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const IntakeForm = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <div className="max-w-md w-full bg-softblue rounded-2xl shadow-xl p-8 flex flex-col gap-4 items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-softblue-800 mb-4 font-sans text-center">
          Patient Intake Form
        </h1>
        {/* Placeholder content */}
        <p className="text-base md:text-lg text-softblue-800 text-center mb-6">
          This is where the new patient intake form will go.
        </p>
        <Button
          variant="secondary"
          className="rounded-lg text-lg font-semibold px-6 py-2"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default IntakeForm;
