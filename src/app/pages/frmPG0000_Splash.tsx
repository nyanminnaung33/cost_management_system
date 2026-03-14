import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            原価管理システム
          </h1>
          <p className="text-xl text-gray-600">Cost Management System</p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-700">準備中です</p>
          <p className="text-sm text-gray-500">しばらくお待ちください</p>
        </div>

        <div className="mt-12 text-xs text-gray-400">
          Version 2.1.0
        </div>
      </div>
    </div>
  );
}
