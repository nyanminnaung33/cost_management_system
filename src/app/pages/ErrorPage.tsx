import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AlertCircle, Home } from "lucide-react";

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Unknown error occurred";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || `${error.status} Error`;
    errorDetails = error.data?.message || error.data || "";
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <CardTitle className="text-xl">エラーが発生しました</CardTitle>
              <CardDescription>予期しないエラーが発生しました</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-900">{errorMessage}</p>
            {errorDetails && (
              <pre className="mt-2 text-xs text-red-800 overflow-auto max-h-40">
                {errorDetails}
              </pre>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/app")}>
              <Home className="w-4 h-4 mr-2" />
              メインメニューに戻る
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              ページを再読み込み
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
