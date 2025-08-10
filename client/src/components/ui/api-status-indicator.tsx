import { Badge } from "@/components/ui/badge";
import { useGetYourGuideStatus } from "@/hooks/use-getyourguide";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

export function ApiStatusIndicator() {
  const { data: status, isLoading } = useGetYourGuideStatus();

  if (isLoading) return null;

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