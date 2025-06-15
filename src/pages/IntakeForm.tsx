
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const HISTORY_OPTIONS = [
  "Hypertension",
  "Diabetes",
  "Heart Disease",
  "Asthma",
  "Allergies",
  "None"
];

const IntakeForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    age: "",
    contact: "",
    symptoms: "",
    insurance: "",
    history: [] as string[],
    historyText: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (option: string, checked: boolean) => {
    if (checked) {
      setForm((f) => ({
        ...f,
        history: option === "None" ? ["None"] : [...f.history.filter((v) => v !== "None"), option]
      }));
    } else {
      setForm((f) => ({
        ...f,
        history: f.history.filter((v) => v !== option)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.dob.trim() ||
      !form.age.trim() ||
      !form.contact.trim() ||
      !form.symptoms.trim() ||
      !form.insurance.trim()
    ) {
      toast({
        variant: "destructive",
        title: "Please fill out all required fields.",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Form submitted!",
      description: "The patient's intake information has been recorded.",
    });
    setForm({
      name: "",
      dob: "",
      age: "",
      contact: "",
      symptoms: "",
      insurance: "",
      history: [],
      historyText: ""
    });
    setTimeout(() => setSubmitted(false), 1200);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-softblue px-2 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-5 md:gap-7">
        <h1 className="text-2xl md:text-3xl font-bold text-softblue-800 font-sans text-center mb-2">
          New Patient Intake Form
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
          {/* Patient Name */}
          <div>
            <Label htmlFor="name" className="block text-base text-softblue-800 font-medium mb-1">
              Patient Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInput}
              placeholder="Full Name"
              required
              className="bg-softblue-200 focus:bg-white text-lg"
            />
          </div>
          {/* DOB & Age grid */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="dob" className="block text-base text-softblue-800 font-medium mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleInput}
                required
                className="bg-softblue-200 focus:bg-white text-lg"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="age" className="block text-base text-softblue-800 font-medium mb-1">
                Age <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={0}
                value={form.age}
                onChange={handleInput}
                placeholder="Age"
                required
                className="bg-softblue-200 focus:bg-white text-lg"
              />
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <Label htmlFor="contact" className="block text-base text-softblue-800 font-medium mb-1">
              Contact Information <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              value={form.contact}
              onChange={handleInput}
              placeholder="Phone or Email"
              required
              className="bg-softblue-200 focus:bg-white text-lg"
            />
          </div>
          {/* Symptoms */}
          <div>
            <Label htmlFor="symptoms" className="block text-base text-softblue-800 font-medium mb-1">
              Symptoms <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="symptoms"
              name="symptoms"
              value={form.symptoms}
              onChange={handleInput}
              placeholder="Describe current symptoms"
              rows={3}
              required
              className="bg-softblue-200 focus:bg-white text-lg min-h-[80px]"
            />
          </div>
          {/* Medical History */}
          <div>
            <Label className="block text-base text-softblue-800 font-medium mb-1">
              Medical History <span className="text-grayscale-500">(Select all that apply)</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {HISTORY_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2 text-softblue-800 text-base cursor-pointer select-none">
                  <Checkbox
                    checked={form.history.includes(option)}
                    onCheckedChange={(checked) =>
                      handleCheckbox(option, !!checked)
                    }
                    disabled={option === "None" ? form.history.length > 0 && !form.history.includes("None") : form.history.includes("None")}
                  />
                  {option}
                </label>
              ))}
            </div>
            <Textarea
              name="historyText"
              value={form.historyText}
              onChange={handleInput}
              placeholder="Other history details (optional)"
              className="bg-softblue-200 focus:bg-white text-lg min-h-[60px]"
            />
          </div>
          {/* Insurance Info */}
          <div>
            <Label htmlFor="insurance" className="block text-base text-softblue-800 font-medium mb-1">
              Insurance Information <span className="text-red-500">*</span>
            </Label>
            <Input
              id="insurance"
              name="insurance"
              type="text"
              value={form.insurance}
              onChange={handleInput}
              placeholder="Provider, Policy #"
              required
              className="bg-softblue-200 focus:bg-white text-lg"
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2 items-center justify-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto rounded-lg font-semibold text-lg px-7"
              onClick={() => navigate("/dashboard")}
              disabled={submitted}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full sm:w-auto bg-softblue-600 hover:bg-softblue-800 text-white rounded-lg font-semibold text-lg px-7"
              disabled={submitted}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
