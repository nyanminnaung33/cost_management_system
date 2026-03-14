import { useLocation } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AlertCircle } from "lucide-react";

export function PlaceholderScreen() {
  const location = useLocation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle>画面準備中</CardTitle>
              <CardDescription>この画面は現在開発中です</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <p>パス: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
