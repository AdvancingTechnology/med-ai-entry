
import { useToast } from '@/hooks/use-toast';

interface WebhookData {
  [key: string]: any;
}

export const useWebhookIntegration = () => {
  const { toast } = useToast();

  const sendToChatWebhook = async (data: WebhookData) => {
    try {
      const response = await fetch('http://localhost:5678/webhook/chat-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send to chat webhook');
      }

      return await response.json();
    } catch (error) {
      console.error('Chat webhook error:', error);
      toast({
        title: "Webhook Error",
        description: "Failed to send data to chat webhook",
        variant: "destructive",
      });
      throw error;
    }
  };

  const sendToExportWebhook = async (data: WebhookData) => {
    try {
      const response = await fetch('http://localhost:5678/webhook/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send to export webhook');
      }

      toast({
        title: "Export Successful!",
        description: `Data exported to ${data.target} successfully.`,
      });

      return await response.json();
    } catch (error) {
      console.error('Export webhook error:', error);
      toast({
        title: "Export Failed",
        description: "Export failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    sendToChatWebhook,
    sendToExportWebhook,
  };
};
