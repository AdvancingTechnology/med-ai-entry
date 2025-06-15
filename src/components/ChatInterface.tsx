
import React, { useRef, useEffect, useState } from "react";
import { SendHorizontal, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  sender: "assistant" | "doctor";
  text: string;
};

const sampleMessages: Message[] = [
  {
    sender: "assistant",
    text: "Good morning, Dr. James! Here is your overview for the day.",
  },
  {
    sender: "doctor",
    text: "Thank you. Can you summarize Melissa Carter's medications?",
  },
  {
    sender: "assistant",
    text: "Melissa is currently taking Lisinopril 10mg daily for hypertension and uses a nasal spray as needed during allergy season.",
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "doctor", text: input.trim() },
    ]);
    setInput("");
    // In a real app, fire assistant reply logic here.
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-softblue-200 h-full flex flex-col min-h-[440px] md:min-h-[520px] max-h-[78vh]">
      <h3 className="text-lg font-bold text-softblue-800 font-sans p-5 pb-3 border-b border-softblue-100">Assistant</h3>
      {/* Chat bubbles */}
      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-3 space-y-4" style={{ minHeight: 220 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "doctor" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-2xl px-4 py-3 max-w-[72%] text-base font-sans ${
                m.sender === "assistant"
                  ? "bg-softblue-100 text-softblue-800 rounded-bl-none"
                  : "bg-softblue-600 text-white rounded-br-none"
              }`}
              aria-label={m.sender === "assistant" ? "Assistant message" : "Your message"}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* Message input */}
      <form
        onSubmit={handleSend}
        className="p-4 flex gap-2 border-t border-softblue-100 bg-softblue"
        style={{ position: "relative" }}
        aria-label="Send a message"
      >
        <input
          type="text"
          className="flex-1 rounded-xl border border-softblue-200 px-4 py-3 text-base font-sans outline-none focus:ring-2 focus:ring-softblue-400 bg-white placeholder-gray-400 text-gray-700"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Message input"
        />
        <Button
          type="submit"
          variant="default"
          className="rounded-xl px-4 py-2 bg-softblue-600 hover:bg-softblue-800 transition text-lg font-bold"
          aria-label="Send message"
        >
          <SendHorizontal size={22} className="mr-1" />
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
