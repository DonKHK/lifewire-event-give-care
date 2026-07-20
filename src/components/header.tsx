"use client";

import Link from "next/link";
import { Heart, Sun, Moon, ExternalLink, LogOut, LogIn } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "?";

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
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
          >
            首頁
          </Link>
          <Link
            href="/upload"
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
          >
            上載相片
          </Link>
          <Link
            href="/profile"
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
          >
            個人檔案
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
            >
              Admin
            </Link>
          )}
          <Link
            href="/assignment"
            className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
          >
            功課說明
          </Link>

          <span className="mx-1 hidden h-4 w-px bg-white/20 sm:block" />

          {/* Lifewire 主頁 external link */}
          <a
            href="https://lifewire.hk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white sm:flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lifewire 主頁</span>
          </a>

          {/* Auth Section */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {/* User avatar + name */}
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white transition-all hover:bg-white/20"
              >
                <Avatar className="h-6 w-6 border border-white/30">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-[#2A9D8F] text-[10px] font-bold text-white">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[100px] truncate sm:inline">
                  {user.name}
                </span>
                {user.role === "admin" && (
                  <span className="hidden rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-200 sm:inline">
                    Admin
                  </span>
                )}
              </Link>

              {/* Logout button */}
              <button
                onClick={logout}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
                aria-label="登出"
                title="登出"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/25 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">登入</span>
            </Link>
          )}

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
