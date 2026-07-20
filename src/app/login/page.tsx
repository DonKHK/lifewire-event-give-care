"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Loader2, AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("請輸入電郵地址同密碼");
      return;
    }

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      router.push("/");
    } else {
      setError("電郵地址或密碼不正確，請再試一次");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#E8F5F3] dark:bg-[#1a3d38] p-3">
            <Heart className="h-6 w-6 text-[#2A9D8F]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E293B] dark:text-gray-100 sm:text-3xl">
            登入
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            登入你嘅 Lifewire 帳戶，一齊守護 rare disease 家庭
          </p>
        </div>

        <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-gray-300"
              >
                電郵地址
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 dark:text-gray-300"
              >
                密碼
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F] pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300"
                  tabIndex={-1}
                  aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="xl"
              className="w-full bg-[#2A9D8F] font-semibold text-white shadow-lg shadow-[#2A9D8F]/20 transition-all hover:bg-[#248f82] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  登入中...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  登入
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-gray-400">
              未有帳戶？{" "}
              <Link
                href="/register"
                className="font-medium text-[#2A9D8F] transition-colors hover:text-[#248f82]"
              >
                立即註冊
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 p-4">
            <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-gray-400">
              🔑 試用帳戶（無需登記）
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-gray-400">管理員</span>
                <span className="font-mono text-[#2A9D8F]">
                  admin@lifewire.org / admin123
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-gray-400">一般用戶</span>
                <span className="font-mono text-[#2A9D8F]">
                  user@test.com / user123
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}