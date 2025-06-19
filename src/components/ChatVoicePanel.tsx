
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TranscriptItem {
  id: string;
  text: string;
  isFinal: boolean;
  timestamp: Date;
  speaker: 'user' | 'system';
}

const ChatVoicePanel = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsRecognitionSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const results = event.results;
          const lastResult = results[results.length - 1];
          
          if (lastResult) {
            const transcriptText = lastResult[0].transcript;
            const isFinal = lastResult.isFinal;
            
            setTranscript(prev => {
              const newTranscript = [...prev];
              const existingIndex = newTranscript.findIndex(item => !item.isFinal && item.speaker === 'user');
              
              if (existingIndex !== -1 && !isFinal) {
                // Update interim result
                newTranscript[existingIndex] = {
                  ...newTranscript[existingIndex],
                  text: transcriptText
                };
              } else {
                // Add new result
                newTranscript.push({
                  id: Date.now().toString(),
                  text: transcriptText,
                  isFinal,
                  timestamp: new Date(),
                  speaker: 'user'
                });
              }
              
              return newTranscript;
            });

            // Send to webhook if final result
            if (isFinal) {
              sendToWebhook(transcriptText, 'voice');
            }
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          toast({
            title: "Speech Recognition Error",
            description: `Error: ${event.error}`,
            variant: "destructive",
          });
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  useEffect(() => {
    // Auto-scroll to bottom when new transcript items are added
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const sendToWebhook = async (text: string, type: 'voice' | 'text') => {
    try {
      const response = await fetch('http://localhost:5678/webhook/chat-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          type,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send to webhook');
      }

      console.log('Successfully sent to n8n webhook:', text);
    } catch (error) {
      console.error('Error sending to webhook:', error);
      toast({
        title: "Webhook Error",
        description: "Failed to send data to n8n webhook",
        variant: "destructive",
      });
    }
  };

  const startListening = () => {
    if (recognitionRef.current && isRecognitionSupported) {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening Started",
        description: "Voice recognition is now active",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Listening Stopped",
        description: "Voice recognition has been stopped",
      });
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      const newTranscriptItem: TranscriptItem = {
        id: Date.now().toString(),
        text: textInput,
        isFinal: true,
        timestamp: new Date(),
        speaker: 'user'
      };
      
      setTranscript(prev => [...prev, newTranscriptItem]);
      sendToWebhook(textInput, 'text');
      setTextInput('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat & Voice Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Controls */}
        <div className="flex gap-2 items-center">
          {isRecognitionSupported ? (
            <>
              <Button
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Listening
                  </>
                )}
              </Button>
              {isListening && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Recording...
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-500">
              Voice recognition not supported in this browser
            </div>
          )}
        </div>

        {/* Transcript Display */}
        <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
          <div className="space-y-2">
            {transcript.length === 0 ? (
              <div className="text-gray-500 text-center">
                No messages yet. Start speaking or type below.
              </div>
            ) : (
              transcript.map((item) => (
                <div
                  key={item.id}
                  className={`p-2 rounded-lg ${
                    item.isFinal
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <div className="text-sm">
                    <span className="font-medium">
                      {item.speaker === 'user' ? 'You' : 'System'}:
                    </span>{' '}
                    {item.text}
                    {!item.isFinal && (
                      <span className="italic text-gray-600"> (interim)</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Text Input Fallback */}
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!textInput.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatVoicePanel;
