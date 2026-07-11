"use client";

import { useToast, type ToastVariant } from "@/lib/toast-context";

const iconMap: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  love: "❤",
};

const bgMap: Record<ToastVariant, string> = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-[#2A9D8F]",
  love: "bg-pink-500",
};

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={`
            pointer-events-auto cursor-pointer
            flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl
            text-white text-sm font-medium
            ${bgMap[toast.variant]}
            ${toast.exiting ? "animate-toast-out" : "animate-toast-in"}
            transition-all duration-300
            hover:brightness-110
            max-w-sm
          `}
        >
          <span className="text-lg leading-none">{iconMap[toast.variant]}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}