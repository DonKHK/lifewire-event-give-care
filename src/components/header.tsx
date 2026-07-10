"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#2A9D8F]/95 backdrop-blur supports-[backdrop-filter]:bg-[#2A9D8F]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-white transition-colors group-hover:text-white/90 sm:text-3xl">
              Lifewire
            </span>
            <Heart className="h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-[11px] font-medium tracking-[0.2em] text-white/70 sm:text-xs">
            守護 · 連結 · 希望
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            首頁
          </Link>
          <Link
            href="/upload"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            上載相片
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            個人檔案
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}