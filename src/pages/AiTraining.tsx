
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { FilePlus, UploadCloud, Book, UserCheck } from "lucide-react";

const CONDITION_CATEGORIES = [
  "Hypertension",
  "Diabetes",
  "Routine Checkup",
  "Preventive Care",
  "Asthma",
  "COPD",
  "Thyroid Disorders"
];

const ACTION_PLACEHOLDERS = [
  "Order CBC, BMP, or A1C as needed...",
  "Schedule follow-up in 2 weeks...",
  "Prescribe/adjust meds (metformin, etc)..."
];

export default function AiTraining() {
  const navigate = useNavigate();
  const [hpiSamples, setHpiSamples] = useState<string>("");
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);
  const [actions, setActions] = useState<string[]>([""]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(20);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [finalDialogOpen, setFinalDialogOpen] = useState<boolean>(false);

  // Progressive auto-save simulation (localStorage for demo; can be replaced with API)
  useEffect(() => {
    const saveData = setTimeout(() => {
      window.localStorage.setItem("aiHpiTraining", JSON.stringify({
        hpiSamples,
        uploadedDocs: uploadedDocs.map(f => f.name), // Store names only for demo
        actions,
        selectedConditions
      }));
      setToastMsg("Progress auto-saved!");
    }, 1100);
    return () => clearTimeout(saveData);
  }, [hpiSamples, uploadedDocs, actions, selectedConditions]);

  // Feedback dismissal
  useEffect(() => {
    if (toastMsg) {
      const toid = setTimeout(() => setToastMsg(""), 1400);
      return () => clearTimeout(toid);
    }
  }, [toastMsg]);

  // Confidence bar calculation
  useEffect(() => {
    let conf = 20;
    if (hpiSamples.trim().length > 240) conf += 35;
    if (actions.filter((a) => !!a.trim()).length > 1) conf += 25;
    if (selectedConditions.length > 1) conf += 20;
    setConfidence(Math.min(100, conf));
  }, [hpiSamples, actions, selectedConditions]);

  // Handle inputs
  const handleActionChange = (idx: number, val: string) => {
    setActions((prev) => {
      const n = [...prev];
      n[idx] = val;
      return n;
    });
  };

  const addAction = () => setActions([...actions, ""]);

  const handleCheckbox = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond)
        ? prev.filter((c) => c !== cond)
        : [...prev, cond]
    );
    setToastMsg("Condition updated!");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedDocs((prev) => [...prev, ...Array.from(files)]);
      setToastMsg("Document uploaded!");
    }
  };

  const handleSave = () => setToastMsg("Training session saved!");
  const handleClear = () => {
    setHpiSamples("");
    setActions([""]);
    setSelectedConditions([]);
    setUploadedDocs([]);
    setToastMsg("Entries cleared!");
  };

  const handleFinalize = () => setFinalDialogOpen(true);

  const handleConfirmFinalize = () => {
    setFinalDialogOpen(false);
    setToastMsg("AI Training finalized!");
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  // Dynamic preview summary based on current state
  const aiSummary = [
    hpiSamples && <li key="hpi">HPI samples provided ({hpiSamples.split("\n").filter(Boolean).length})</li>,
    !!uploadedDocs.length && <li key="docs">{uploadedDocs.length} document(s) uploaded</li>,
    actions.filter((a) => !!a.trim()).length ? <li key="act">{actions.filter((a) => !!a.trim()).length} action(s)/response(s) entered</li> : null,
    selectedConditions.length ? <li key="cond">{selectedConditions.join(", ")}</li> : null,
  ].filter(Boolean);

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full flex flex-col items-center bg-softblue-50 pb-28 px-2 pt-8 animate-fade-in">
        {/* Header */}
        <header className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-softblue-800 flex gap-2 items-center font-sans">
              <UserCheck className="text-softblue-400" size={32} />
              Train Your AI Assistant
            </h1>
            <p className="mt-2 text-softblue-700 text-base max-w-xl">
              Here, you’ll teach the AI your unique medical decision-making style by entering examples of patient HPIs (History of Present Illness) and typical responses/actions you'd take.
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-softblue-600 hover:bg-softblue-700 rounded-lg text-white font-semibold"
            onClick={() => navigate("/dashboard")}
            variant="default"
            type="button"
          >
            &larr; Back to Dashboard
          </Button>
        </header>

        <main className="w-full max-w-3xl gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Main HPI and Actions section */}
          <section className="md:col-span-2 flex flex-col gap-6">
            <Card className="rounded-2xl border-softblue-200 bg-white shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Book className="text-softblue-400" />
                  <CardTitle className="text-softblue-700 text-lg">
                    HPI Training Samples
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <label className="font-medium text-softblue-800 mb-1 flex items-center gap-2">
                  Paste or Type Sample HPI Narratives Here
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-1 text-softblue-400 cursor-help">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      What makes a good HPI sample? <br />
                      Include variations in symptom, duration, and context for a richer AI model.
                    </TooltipContent>
                  </Tooltip>
                </label>
                <Textarea
                  className="rounded-lg border-softblue-200 focus:ring-softblue-400 font-sans text-base min-h-[160px] mb-3"
                  value={hpiSamples}
                  onChange={(e) => {
                    setHpiSamples(e.target.value);
                    setToastMsg("Training sample added!");
                  }}
                  placeholder="e.g. 52yo male presenting with persistent cough for 2 weeks..."
                  rows={7}
                />

                <div className="flex flex-row gap-3 items-center justify-between">
                  <label className="font-medium text-softblue-800 flex items-center gap-1">
                    <UploadCloud className="text-softblue-400" size={18} />
                    Upload Document
                  </label>
                  <Input
                    type="file"
                    accept=".txt,.pdf"
                    multiple
                    className="w-fit border-softblue-200 bg-softblue-50"
                    onChange={handleUpload}
                  />
                </div>
                {!!uploadedDocs.length && (
                  <div className="mt-2 text-xs text-softblue-600 font-mono flex flex-wrap gap-1">
                    {uploadedDocs.map((f, i) => (
                      <span key={f.name + i} className="bg-softblue-200 rounded px-2 py-0.5">{f.name}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-softblue-200 bg-white shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <FilePlus className="text-softblue-400" />
                  <CardTitle className="text-softblue-700 text-lg">
                    Typical Actions &amp; Responses
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label className="font-medium text-softblue-800">
                          Orders/Responses (Labs, Imaging, Follow-ups)
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        What type of responses should I add? <br />
                        Describe typical next steps you’d take for your most common patient scenarios.
                      </TooltipContent>
                    </Tooltip>
                    {actions.map((value, idx) => (
                      <Input
                        key={idx}
                        className="mt-2 rounded border-softblue-200"
                        placeholder={ACTION_PLACEHOLDERS[idx] || "Add other action..."}
                        value={value}
                        onChange={e => {
                          handleActionChange(idx, e.target.value);
                          setToastMsg("Common response saved!");
                        }}
                      />
                    ))}
                    <Button variant="ghost" type="button" size="sm" className="mt-2 text-softblue-600" onClick={addAction}>
                      + Add More
                    </Button>
                  </div>
                  <div>
                    <label className="font-medium text-softblue-800 mb-1">
                      Categorize Common Conditions
                    </label>
                    <div className="flex flex-wrap gap-3 mt-1">
                      {CONDITION_CATEGORIES.map((cond) => (
                        <label
                          key={cond}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs cursor-pointer ${
                            selectedConditions.includes(cond)
                              ? "bg-softblue-200 text-softblue-800 font-bold"
                              : "bg-softblue-50 text-softblue-700"
                          }`}
                        >
                          <Checkbox
                            checked={selectedConditions.includes(cond)}
                            onCheckedChange={() => handleCheckbox(cond)}
                          />
                          {cond}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Persistent Preview/Actions */}
          <aside className="md:col-span-1 sticky top-8 flex flex-col gap-6 h-full">
            <Card className="rounded-2xl border-softblue-200 bg-white shadow">
              <CardHeader className="pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <CardTitle className="text-softblue-700 text-lg">AI Training Preview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <ul className="list-disc ml-5 text-softblue-800 space-y-1 text-sm">
                  {aiSummary.length ? aiSummary : <li>No training data yet</li>}
                </ul>
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-softblue-400">AI Confidence Level</span>
                    <span className={`text-xs font-mono ${confidence > 90 ? 'text-green-700' : 'text-softblue-600'}`}>{confidence}%</span>
                  </div>
                  <Progress value={confidence} className={confidence > 90 ? "bg-green-200" : ""} />
                </div>
                <div className="mt-2 text-xs text-softblue-500">
                  {confidence < 90
                    ? "Add more sample HPIs, actions, or select more conditions for stronger AI training."
                    : "Confident! Ready to train the AI."
                  }
                </div>
              </CardContent>
            </Card>
            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                className="rounded-lg bg-softblue-600 hover:bg-softblue-700 text-white font-semibold"
                onClick={handleSave}
                type="button"
              >
                Save Training Session
              </Button>
              <Button
                className="rounded-lg border-softblue-300 text-softblue-700"
                onClick={handleClear}
                type="button"
                variant="outline"
              >
                Clear Entries
              </Button>
              <Button
                className="rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold animate-pulse"
                onClick={handleFinalize}
                type="button"
                disabled={confidence < 60}
              >
                Finalize &amp; Train AI
              </Button>
            </div>
          </aside>
        </main>
        {/* Welcome UX + feedback snackbar */}
        <div className="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 max-w-xs w-full pointer-events-none">
          <div
            className={`rounded-lg px-4 py-3 text-sm text-white bg-softblue-700 shadow-xl transition-all duration-300 flex items-center gap-2 pointer-events-auto
              ${toastMsg ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            role="status"
          >
            {toastMsg}
          </div>
        </div>
        {/* Finalize Confirmation Dialog */}
        {finalDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-[95vw] max-w-md flex flex-col items-center gap-5 animate-scale-in">
              <h2 className="font-bold text-xl text-softblue-800 text-center">Ready to train your AI?</h2>
              <p className="text-softblue-700 text-sm text-center">
                You're about to train the AI with your provided HPI and response examples.
                <br />
                <span className="text-green-700 font-semibold">Your data is securely processed locally.</span>
              </p>
              <div className="flex gap-3 w-full mt-2 justify-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full" onClick={handleConfirmFinalize}>Proceed &amp; Train</Button>
                <Button className="w-full" variant="secondary" onClick={() => setFinalDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
