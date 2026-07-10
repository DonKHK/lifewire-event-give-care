"use client";

import { useRef, useState, useCallback } from "react";
import { Heart, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockEvent } from "@/lib/data";
import type { Photo } from "@/types";

interface ShareCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photo: Photo;
}

type AspectRatio = "story" | "square";

export function ShareCardModal({ open, onOpenChange, photo }: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState<AspectRatio>("story");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloadLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `lifewire-share-${photo.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate share card:", err);
    } finally {
      setDownloadLoading(false);
    }
  }, [photo.id]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, []);

  const handleWhatsApp = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `我支持咗呢一刻 ❤️ 守護 rare disease 家庭\n\n${mockEvent.title}\n\n`
    );
    window.open(`https://wa.me/?text=${text}${url}`, "_blank");
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#1E293B]">
            分享呢一刻 · 守護 rare disease 家庭
          </DialogTitle>
        </DialogHeader>

        {/* Aspect Ratio Toggle */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setRatio("story")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              ratio === "story"
                ? "bg-[#2A9D8F] text-white shadow-md shadow-[#2A9D8F]/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="24" rx="2" />
            </svg>
            Instagram Story (9:16)
          </button>
          <button
            onClick={() => setRatio("square")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              ratio === "square"
                ? "bg-[#2A9D8F] text-white shadow-md shadow-[#2A9D8F]/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            Square (1:1)
          </button>
        </div>

        {/* Share Card Preview */}
        <div
          ref={cardRef}
          className={`relative mx-auto overflow-hidden rounded-2xl bg-white shadow-xl ${
            ratio === "story" ? "aspect-[9/16] w-[220px]" : "aspect-square w-[220px]"
          }`}
          style={{ maxWidth: "100%" }}
        >
          {/* Photo Background */}
          <div className="absolute inset-0">
            <img
              src={photo.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
            {/* Subtle brand overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A9D8F]/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col justify-end p-5">
            {/* Lifewire Logo */}
            <div className="absolute left-5 top-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
                <Heart className="h-3.5 w-3.5 fill-[#2A9D8F] text-[#2A9D8F]" />
                <span className="text-sm font-bold tracking-wide text-white">
                  Lifewire
                </span>
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-3">
              {/* Event tag */}
              <div className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                {mockEvent.title}
              </div>

              {/* Hero text */}
              <p className="text-lg font-bold leading-tight text-white drop-shadow-lg">
                我支持咗呢一刻 ❤️
              </p>
              <p className="text-base font-semibold leading-tight text-white/95 drop-shadow-md">
                守護 rare disease 家庭
              </p>

              {/* Tagline */}
              <div className="pt-1">
                <div className="h-px w-8 bg-white/40" />
                <p className="mt-1.5 text-xs font-medium tracking-wider text-white/70">
                  守護 · 連結 · 希望
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={downloadLoading}
          size="xl"
          className="w-full bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
        >
          {downloadLoading ? (
            <>
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              正在生成...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              下載圖片
            </>
          )}
        </Button>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">或者</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Share Options */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex-1 border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-[#2A9D8F]"
          >
            {linkCopied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                已複製
              </>
            ) : (
              <>
                {linkCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                複製連結
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleWhatsApp}
            className="flex-1 border-slate-200 text-slate-600 transition-all hover:bg-green-50 hover:text-green-600"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </Button>
        </div>

        {/* TODO: Replace with Supabase share tracking */}
        <p className="text-center text-xs text-slate-400">
          TODO: 整合 Supabase 追蹤分享次數
        </p>
      </DialogContent>
    </Dialog>
  );
}