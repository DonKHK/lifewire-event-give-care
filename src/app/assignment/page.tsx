"use client";

import {
  Camera,
  Heart,
  ImagePlus,
  Upload,
  Share2,
  Flag,
  Gift,
  Trophy,
  User,
  Shield,
  Layout,
  Smartphone,
  Palette,
  Bell,
  ExternalLink,
  BookOpen,
  Code2,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const techStack = [
  { name: "Next.js 14", role: "React Framework (App Router)", color: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "TypeScript", role: "型別安全嘅開發語言", color: "bg-[#3178C6] text-white" },
  { name: "Tailwind CSS", role: "Utility-first CSS 框架", color: "bg-[#06B6D4] text-white" },
  { name: "shadcn/ui", role: "可重用 UI 元件庫", color: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "Base UI", role: "Headless UI 元件 (Avatar)", color: "bg-[#8250DF] text-white" },
  { name: "Lucide Icons", role: "簡潔開源圖示集", color: "bg-[#F56565] text-white" },
  { name: "Supabase", role: "後端數據庫 (規劃中)", color: "bg-[#3ECF8E] text-black" },
  { name: "React Hooks", role: "useState / useRef / useCallback", color: "bg-[#61DAFB] text-black" },
];

const features = [
  {
    icon: <Layout className="h-5 w-5" />,
    title: "活動首頁 (Hero Section)",
    desc: "吸引眼嘅活動橫幅，展示活動名稱、日期、描述同埋壯觀嘅背景圖片",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Layout className="h-5 w-5" />,
    title: "活動統計數據",
    desc: "即時顯示活動成果：相片總數、支持次數、籌款金額、受助家庭數目",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <ImagePlus className="h-5 w-5" />,
    title: "相片牆 (Photo Gallery)",
    desc: "展示活動相片，支援 Like / Unlike，按熱門度排序",
    color: "text-[#E76F51]",
    bg: "bg-[#FDF0ED]",
  },
  {
    icon: <Upload className="h-5 w-5" />,
    title: "上載相片",
    desc: "上載活動相片，揀選圖片、寫 caption、即時預覽",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Share2 className="h-5 w-5" />,
    title: "相片詳細頁 + 分享功能",
    desc: "Click 入相片睇大圖、caption、上載者資料；支援 WhatsApp / Facebook / Link 分享",
    color: "text-[#E76F51]",
    bg: "bg-[#FDF0ED]",
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "捐助 / 支持 Modal",
    desc: "一鍵表達支持，揀選支持金額、留言，為 rare disease 家庭送上祝福",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Flag className="h-5 w-5" />,
    title: "舉報功能 (Report Modal)",
    desc: "舉報不適當嘅相片內容，維護社群質素",
    color: "text-[#E76F51]",
    bg: "bg-[#FDF0ED]",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "排行榜 (Leaderboard)",
    desc: "顯示最高支持次數嘅用戶排名，鼓勵更多人參與",
    color: "text-[#F6B17A]",
    bg: "bg-[#FEF3E8]",
  },
  {
    icon: <User className="h-5 w-5" />,
    title: "個人檔案 (Profile Page)",
    desc: "顯示用戶名稱、頭像、簡介、已上載相片數、收到支持數、收到讚數；支援**編輯個人檔案**（改名稱、簡介、電郵）",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Camera className="h-5 w-5" />,
    title: "頭像更新 (Camera Modal)",
    desc: "三種方式更新頭像：📷 相機拍照 / 🖼️ 選擇圖片 / 🔗 貼上圖片 URL，即時預覽",
    color: "text-[#E76F51]",
    bg: "bg-[#FDF0ED]",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Admin 管理頁面",
    desc: "活動總覽、最高支持者排名、所有相片管理、一鍵編輯相片資料",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "深色模式 / 淺色模式",
    desc: "支援 Dark Mode 切換，主題色統一使用 #2A9D8F（Teal）+ #E76F51（Coral）",
    color: "text-[#F6B17A]",
    bg: "bg-[#FEF3E8]",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Responsive 響應式設計",
    desc: "手機、平板、桌面皆完美顯示，Mobile-first 設計",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: "Toast 通知系統",
    desc: "即時操作回饋（成功/錯誤提示），提升用戶體驗",
    color: "text-[#E76F51]",
    bg: "bg-[#FDF0ED]",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "分享卡生成 (Share Card)",
    desc: "將活動相片生成為精美分享卡，方便分享到社交媒體",
    color: "text-[#2A9D8F]",
    bg: "bg-[#E8F5F3]",
  },
];

export default function AssignmentPage() {
  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#E76F51] shadow-xl shadow-[#2A9D8F]/30">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            功課說明
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Assignment 1 — Web Development Project
          </p>
        </div>

        {/* Project Info Card */}
        <Card className="mb-10 border-0 bg-white p-8 shadow-xl shadow-[#2A9D8F]/20 dark:bg-[#0d1a17]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#1E293B] dark:text-gray-100">
                專案資訊
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-medium text-slate-500 dark:text-gray-400 min-w-[80px]">
                    專案名稱
                  </span>
                  <span className="text-slate-800 dark:text-gray-200">
                    Lifewire Event — Give Care
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-medium text-slate-500 dark:text-gray-400 min-w-[80px]">
                    開發者
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-gray-200">
                    Don Kwan
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-medium text-slate-500 dark:text-gray-400 min-w-[80px]">
                    完成日期
                  </span>
                  <span className="text-slate-800 dark:text-gray-200">
                    2026年7月11日
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 font-medium text-slate-500 dark:text-gray-400 min-w-[80px]">
                    GitHub
                  </span>
                  <a
                    href="https://github.com/DonKHK/lifewire-event-give-care"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#2A9D8F] hover:underline"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    DonKHK/lifewire-event-give-care
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#1E293B] dark:text-gray-100">
                技術棧
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Feature List */}
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-bold text-white">全部功能列表</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 bg-white p-5 shadow-lg shadow-[#2A9D8F]/10 transition hover:shadow-xl hover:-translate-y-0.5 dark:bg-[#0d1a17]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#1E293B] dark:text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-white/40">
            此專案為 Assignment 1 嘅部分，所有功能皆由 Don Kwan 開發完成。
          </p>
          <p className="mt-1 text-xs text-white/30">
            © 2026 Lifewire Event — Give Care
          </p>
        </div>
      </section>
    </div>
  );
}