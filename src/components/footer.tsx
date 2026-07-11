"use client";

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 dark:border-gray-700/30 bg-[#248f82] dark:bg-[#071311]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Lifewire
            </span>
            <Heart className="h-4 w-4 fill-white text-white" />
            <span className="text-xl font-extrabold tracking-tight text-white/90">
              Give Care
            </span>
          </div>
          <p className="text-sm text-white/70 dark:text-gray-300">守護 · 連結 · 希望</p>
          <p className="max-w-md text-sm leading-relaxed text-white/60 dark:text-gray-400">
            你嘅支持可以守護 rare disease 家庭。我哋相信，每一份愛心都可以帶嚟改變。
          </p>
          <div className="mt-4 flex items-center gap-6 text-xs text-white/50 dark:text-gray-500">
            <span>© 2026 Lifewire Event</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 fill-[#E76F51] text-[#E76F51]" /> for the community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}