"use client";

import { useState, useCallback } from "react";
import { Heart, Check, CreditCard, Landmark, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/lib/toast-context";
import { mockEvent } from "@/lib/data";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photoCaption?: string;
}

type DonationStep = "amount" | "payment" | "success";

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000];

const PAYMENT_METHODS = [
  {
    id: "credit-card",
    label: "信用卡",
    description: "Visa / Mastercard / American Express",
    icon: CreditCard,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account",
    icon: Landmark,
  },
  {
    id: "fps",
    label: "轉數快 FPS",
    description: "香港快速支付系統",
    icon: Landmark,
  },
];

export function DonationModal({
  open,
  onOpenChange,
  photoCaption,
}: DonationModalProps) {
  const [step, setStep] = useState<DonationStep>("amount");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { addToast } = useToast();

  // Reset state when modal opens
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        // Small delay so reset happens after close animation
        setTimeout(() => {
          setStep("amount");
          setSelectedAmount(null);
          setCustomAmount("");
          setSelectedPayment(null);
          setProcessing(false);
        }, 300);
      }
      onOpenChange(open);
    },
    [onOpenChange]
  );

  const displayAmount =
    selectedAmount ?? (customAmount ? parseInt(customAmount, 10) : 0);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleContinueToPayment = () => {
    if (displayAmount && displayAmount >= 10) {
      setStep("payment");
    }
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
  };

  const handleConfirmDonation = async () => {
    if (!selectedPayment) return;
    setProcessing(true);
    try {
      // TODO: Integrate with Supabase Edge Functions for payment processing
      // For now, simulate a 1.5s processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addToast(
        `多謝你嘅 HK$${displayAmount} 捐款！你嘅善心會直接幫助 rare disease 家庭 💚`,
        "success"
      );
      setStep("success");
    } catch {
      addToast("捐款處理失敗，請稍後再試", "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 pb-2">
          {(["amount", "payment", "success"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step === s
                    ? "bg-[#2A9D8F] text-white shadow-md shadow-[#2A9D8F]/30"
                    : step === "success" || (step === "payment" && s === "amount") || s === "amount"
                    ? "bg-[#E8F5F3] text-[#2A9D8F]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {s === "success" && (step === "success" || (step === "payment" && false)) ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={`h-px w-6 transition-all ${
                    (s === "amount" && step !== "amount") ||
                    (s === "payment" && step === "success")
                      ? "bg-[#2A9D8F]"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Amount Selection */}
        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-[#1E293B] dark:text-gray-100">
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-[#E76F51]" />
                  守護呢一刻
                </span>
              </DialogTitle>
              <p className="text-center text-sm text-slate-500 dark:text-gray-400">
                {photoCaption
                  ? `支持「${photoCaption}」— 每張相片都係一個故事，每一分捐款都係一份希望`
                  : "每一分捐款都係一份希望，直接幫助 rare disease 家庭"}
              </p>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Preset amounts */}
              <div className="grid grid-cols-3 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 px-3 py-4 text-center transition-all ${
                      selectedAmount === amount
                        ? "border-[#2A9D8F] bg-[#E8F5F3] dark:bg-[#1a3d38] shadow-md shadow-[#2A9D8F]/20"
                        : "border-slate-100 dark:border-gray-700 bg-white dark:bg-[#0d1a17] hover:border-[#2A9D8F]/40 hover:shadow-sm"
                    }`}
                  >
                    <span
                      className={`text-lg font-extrabold ${
                        selectedAmount === amount
                          ? "text-[#2A9D8F]"
                          : "text-[#1E293B] dark:text-gray-100"
                      }`}
                    >
                      ${amount}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium text-slate-400">
                      HKD
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-lg font-bold text-slate-400">$</span>
                </div>
                <Input
                  type="number"
                  min={10}
                  placeholder="自訂金額 (最少 HK$10)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedAmount(null);
                  }}
                  className="h-12 border-slate-200 pl-9 text-lg font-bold dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                />
              </div>

              {/* Impact text */}
              <p className="text-center text-xs text-slate-400 dark:text-gray-500">
                💚 捐款將直接支援 rare disease 家庭 · 每 HK$100 可以幫助一個家庭一日嘅護理
              </p>

              <Button
                size="xl"
                disabled={!displayAmount || displayAmount < 10}
                onClick={handleContinueToPayment}
                className="w-full bg-[#2A9D8F] font-semibold text-white shadow-lg shadow-[#2A9D8F]/20 transition-all hover:bg-[#248f82] hover:shadow-xl hover:shadow-[#2A9D8F]/30"
              >
                捐助 HK${displayAmount || "..."}
              </Button>

              {/* TODO: Replace with Supabase donation tracking */}
              <p className="text-center text-xs text-slate-400">
                TODO: 整合 Supabase 追蹤捐款記錄
              </p>
            </div>
          </>
        )}

        {/* Step 2: Payment Method */}
        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-[#1E293B] dark:text-gray-100">
                選擇付款方式
              </DialogTitle>
              <p className="text-center text-sm text-slate-500 dark:text-gray-400">
                捐款金額：HK${displayAmount}
              </p>
            </DialogHeader>

            <div className="space-y-3 py-2">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      selectedPayment === method.id
                        ? "border-[#2A9D8F] bg-[#E8F5F3] dark:bg-[#1a3d38] shadow-md shadow-[#2A9D8F]/20"
                        : "border-slate-100 dark:border-gray-700 bg-white dark:bg-[#0d1a17] hover:border-[#2A9D8F]/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5F3] dark:bg-[#1a3d38]">
                      <Icon className="h-5 w-5 text-[#2A9D8F]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1E293B] dark:text-gray-100">
                        {method.label}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-gray-500">
                        {method.description}
                      </p>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2A9D8F]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Security notice */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 dark:text-gray-500">
                  🔒 安全加密連線 · 資料唔會儲存係我哋伺服器
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => setStep("amount")}
                  className="flex-1 border-slate-200 text-slate-600 dark:border-gray-700 dark:text-gray-400"
                >
                  返回
                </Button>
                <Button
                  size="xl"
                  disabled={!selectedPayment || processing}
                  onClick={handleConfirmDonation}
                  className="flex-1 bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
                >
                  {processing ? (
                    <>
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      處理中...
                    </>
                  ) : (
                    `確認捐款 HK$${displayAmount}`
                  )}
                </Button>
              </div>

              {/* TODO: Replace with Supabase payment tracking */}
              <p className="text-center text-xs text-slate-400">
                TODO: 整合 Supabase Edge Functions 處理捐款
              </p>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-[#1E293B] dark:text-gray-100">
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-[#E76F51]" />
                  多謝你嘅守護！ 💚
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4 text-center">
              {/* Success animation */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F3]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2A9D8F]">
                  <Check className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-[#2A9D8F]">
                  HK${displayAmount}
                </p>
                <p className="text-base font-semibold text-[#1E293B] dark:text-gray-100">
                  已經成功捐款
                </p>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                  你嘅善心會直接幫助 rare disease 家庭，
                  <br />
                  為佢哋帶嚟希望同支援。
                </p>
              </div>

              {/* Impact calculation */}
              <div className="rounded-xl bg-[#F8FAFC] dark:bg-gray-800 p-4 text-center">
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                  今次捐款相當於可以幫助
                </p>
                <p className="mt-1 text-lg font-extrabold text-[#E76F51]">
                  {Math.max(1, Math.floor(displayAmount / 100))} 個
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                  rare disease 家庭一日嘅護理
                </p>
              </div>

              {/* Share prompt */}
              <div className="space-y-2">
                <p className="text-xs text-slate-400 dark:text-gray-500">
                  分享呢份愛心，邀請更多人一齊守護
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `我喺 ${mockEvent.title} 捐助咗 HK$${displayAmount}，一齊守護 rare disease 家庭 💚`
                      );
                      addToast("已複製到剪貼簿！", "info");
                    }}
                    className="border-slate-200 text-slate-600 dark:border-gray-700 dark:text-gray-400"
                  >
                    分享到社交媒體
                  </Button>
                </div>
              </div>

              <Button
                size="xl"
                onClick={handleClose}
                className="w-full bg-[#2A9D8F] font-semibold text-white shadow-lg shadow-[#2A9D8F]/20 transition-all hover:bg-[#248f82]"
              >
                完成
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}