import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function LoginScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tantoCode: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    tantoCode: "",
    password: "",
    global: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Reset errors
    setErrors({ tantoCode: "", password: "", global: "" });

    // Validation
    let hasError = false;
    const newErrors = { tantoCode: "", password: "", global: "" };

    if (!formData.tantoCode.trim()) {
      newErrors.tantoCode = "担当者コードを入力してください";
      hasError = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = "パスワードを入力してください";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Mock login process
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 800);
  };

  const handleClear = () => {
    setFormData({
      tantoCode: "",
      password: "",
    });
    setErrors({ tantoCode: "", password: "", global: "" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="login-container w-full max-w-[440px]">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md border border-[#DADCE0] overflow-hidden">
          {/* Logo Section */}
          <div className="login-logo-wrapper pt-10 pb-6 px-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-[#222222] text-center">
              原価管理システム
            </h1>
            <p className="text-sm text-gray-600 mt-1">Cost Management System</p>
          </div>

          {/* Form Section */}
          <div className="login-form px-6 pb-8 pt-4">
            {/* Global Error Message */}
            {errors.global && (
              <div className="login-error-message mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-[#D32F2F]">{errors.global}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Manager Code Field */}
              <div className="login-form__group">
                <Label 
                  htmlFor="tantoCode" 
                  className="login-form__label text-[13px] font-medium text-[#222222] mb-2 block"
                >
                  担当者コード
                </Label>
                <Input
                  id="tantoCode"
                  name="tantoCode"
                  value={formData.tantoCode}
                  onChange={(e) =>
                    setFormData({ ...formData, tantoCode: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="例：M001"
                  className={`login-form__input h-10 text-sm ${
                    errors.tantoCode ? "border-[#D32F2F] focus-visible:ring-[#D32F2F]" : ""
                  }`}
                />
                {errors.tantoCode && (
                  <p className="text-xs text-[#D32F2F] mt-1">{errors.tantoCode}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="login-form__group">
                <Label 
                  htmlFor="password" 
                  className="login-form__label text-[13px] font-medium text-[#222222] mb-2 block"
                >
                  パスワード
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="パスワードを入力"
                  className={`login-form__input h-10 text-sm ${
                    errors.password ? "border-[#D32F2F] focus-visible:ring-[#D32F2F]" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-[#D32F2F] mt-1">{errors.password}</p>
                )}
              </div>

              {/* Button Row */}
              <div className="login-form__button-row flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="login-form__button--secondary flex-1 h-10 text-sm border-[#DADCE0] hover:bg-gray-50"
                  disabled={isLoading}
                >
                  クリア
                </Button>
                <Button
                  onClick={handleLogin}
                  className="login-form__button--primary flex-1 h-10 text-sm bg-[#1976D2] hover:bg-[#1565C0]"
                  disabled={isLoading}
                >
                  {isLoading ? "ログイン中..." : "ログイン"}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-[#DADCE0]">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Version 2.1.0</span>
              <span>{new Date().toLocaleDateString("ja-JP")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}