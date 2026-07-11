"use client";

import Link from "next/link";
import { Heart, Sun, Moon, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#2A9D8F]/95 backdrop-blur supports-[backdrop-filter]:bg-[#2A9D8F]/80 dark:bg-[#0f2c28]/95">
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

        <nav className="flex items-center gap-2 sm:gap-4">
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

          <span className="mx-1 h-4 w-px bg-white/20" />

          {/* Lifewire 主頁 external link */}
          <a
            href="https://lifewire.hk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lifewire 主頁</span>
          </a>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
            aria-label={theme === "dark" ? "切換至淺色模式" : "切換至深色模式"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
