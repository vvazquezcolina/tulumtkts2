import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function ApiStatusIndicator() {
  const { data: status, isLoading, error } = useQuery({
    queryKey: ['travelpayouts-status'],
    queryFn: async () => {
      const response = await fetch('/api/travelpayouts/status');
      if (!response.ok) {
        throw new Error('Failed to check API status');
      }
      return response.json();
    },
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Don't show anything if loading or error - fail silently
  if (isLoading || error) return null;

  return (
    <div className="flex items-center space-x-2 text-sm">
      {status?.configured && (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          API Conectada
        </Badge>
      )}
    </div>
  );
}