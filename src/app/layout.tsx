import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ToastProvider } from "@/lib/toast-context";
import { Toaster } from "@/components/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lifewire Event — Give Care | 守護 · 連結 · 希望",
  description:
    "一場充滿愛與希望的慈善活動，凝聚社群力量，守護 rare disease 家庭。你嘅支持可以守護 rare disease 家庭。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#2A9D8F] antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <main className="min-h-[calc(100vh-8rem)]">{children}</main>
              <Footer />
              <Toaster />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
