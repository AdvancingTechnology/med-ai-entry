import { useToast } from '@/hooks/use-toast';

export function useWebhookIntegration(path: string) {
  const { toast } = useToast();
  
  const send = async (payload: any) => {
    try {
      const url = `${import.meta.env.VITE_N8N_URL}/webhook/${path}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error(`n8n call failed: ${res.statusText}`);
      
      toast({
        title: "Success",
        description: `Data sent to ${path} successfully.`,
      });
      
      return await res.json();
    } catch (error) {
      console.error(`${path} webhook error:`, error);
      toast({
        title: "Webhook Error",
        description: `Failed to send data to ${path} webhook`,
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return { send };
}
