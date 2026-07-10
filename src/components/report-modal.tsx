"use client";

import { useState } from "react";
import { Flag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportReasons = [
  { value: "inappropriate", label: "不當內容" },
  { value: "spam", label: "垃圾訊息" },
  { value: "other", label: "其他" },
];

export function ReportModal({ open, onOpenChange }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedReason("");
      onOpenChange(false);
    }, 2500);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setSelectedReason("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#1E293B]">
            {submitted ? "多謝你嘅舉報 🙏" : "舉報相片"}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            {submitted
              ? "我哋會盡快處理你嘅舉報。"
              : "請選擇舉報原因，我哋會審核相關內容。"}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-700">
              舉報已成功提交
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 py-2">
              {reportReasons.map((reason) => (
                <button
                  key={reason.value}
                  onClick={() => setSelectedReason(reason.value)}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    selectedReason === reason.value
                      ? "border-[#2A9D8F] bg-[#2A9D8F]/5 text-[#2A9D8F]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selectedReason === reason.value
                          ? "border-[#2A9D8F] bg-[#2A9D8F]"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedReason === reason.value && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                    {reason.label}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1 border-slate-200 text-slate-600"
              >
                取消
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason}
                className="flex-1 bg-[#2A9D8F] font-semibold text-white hover:bg-[#248f82] disabled:opacity-50"
              >
                <Flag className="mr-2 h-4 w-4" />
                提交舉報
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}