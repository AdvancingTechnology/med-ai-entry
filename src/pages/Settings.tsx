
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Settings as SettingsIcon } from "lucide-react";

const TONES = [
  { key: "friendly", label: "Friendly" },
  { key: "professional", label: "Professional" },
  { key: "concise", label: "Concise" }
];
const VOICE_STYLES = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "natural", label: "Natural" }
];
const INTEGRATIONS = [
  { key: "ehr", label: "EHR System (Not Connected)" },
  { key: "calendar", label: "Google Calendar (Not Connected)" },
  { key: "notifications", label: "Notifications (Not Connected)" }
];

const OFFICE_HOURS = [
  { value: "office", label: "Only during office hours" },
  { value: "always", label: "Allow any time" },
];

const defaultSettings = {
  tones: {
    friendly: true,
    professional: false,
    concise: false,
  },
  voiceStyle: "natural",
  sessionTiming: "office",
};

const Settings: React.FC = () => {
  const [tones, setTones] = useState(defaultSettings.tones);
  const [voiceStyle, setVoiceStyle] = useState(defaultSettings.voiceStyle);
  const [sessionTiming, setSessionTiming] = useState(defaultSettings.sessionTiming);

  const handleToneToggle = (key: string) => {
    setTones((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };
  const handleSave = () => {
    window.alert("Settings saved! (You'd typically persist these settings)");
  };
  const handleReset = () => {
    setTones(defaultSettings.tones);
    setVoiceStyle(defaultSettings.voiceStyle);
    setSessionTiming(defaultSettings.sessionTiming);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-softblue-50 px-2 py-8">
      <div className="w-full max-w-2xl flex items-center mb-6">
        <Button variant="ghost" className="rounded-full mr-4" asChild>
          <a href="/dashboard">&larr; Back to Dashboard</a>
        </Button>
        <h1 className="text-2xl font-bold text-softblue-800 flex-1 text-center flex items-center gap-2">
          <SettingsIcon size={24} className="text-softblue-400" />
          AI Assistant Settings
        </h1>
        <div className="w-32" />
      </div>
      <form className="w-full max-w-2xl space-y-6" onSubmit={e => {e.preventDefault(); handleSave();}}>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Tone & Voice Style</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2 text-softblue-800">Assistant Voice Tone</div>
                <div className="flex items-center gap-6">
                  {TONES.map(tone => (
                    <label key={tone.key} className="flex items-center gap-2">
                      <Switch
                        checked={tones[tone.key as keyof typeof tones]}
                        onCheckedChange={() => handleToneToggle(tone.key)}
                        id={tone.key}
                      />
                      <span className="text-softblue-700">{tone.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium mb-2 text-softblue-800">AI Voice Style</div>
                <div className="max-w-xs">
                  <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {INTEGRATIONS.map(integration => (
                <div key={integration.key} className="flex items-center justify-between py-3">
                  <span className="text-softblue-800">{integration.label}</span>
                  <Button size="sm" variant="outline" disabled>
                    Connect
                  </Button>
                </div>
              ))}
              <p className="text-xs text-softblue-400 mt-2">Integration coming soon.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-softblue-200">
          <CardHeader>
            <CardTitle className="text-softblue-700 text-lg">AI Session Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2 text-softblue-800">Session Availability</div>
                <div className="max-w-xs">
                  <Select value={sessionTiming} onValueChange={setSessionTiming}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose session timing" />
                    </SelectTrigger>
                    <SelectContent>
                      {OFFICE_HOURS.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-softblue-400 mt-2">
                  Control when the AI can start new patient sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" className="rounded-lg border-softblue-300 text-softblue-700" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="default" className="rounded-lg bg-softblue-600 hover:bg-softblue-700 text-white font-semibold">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
