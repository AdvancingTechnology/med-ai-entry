import LoginPage from "@/components/LoginPage";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <LoginPage />
      <div className="fixed z-20 top-4 right-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-softblue-600 text-white font-bold px-5 py-2 rounded-xl shadow hover:bg-softblue-800"
        >
          Go to Doctor Dashboard
        </button>
      </div>
    </>
  );
};

export default Index;
