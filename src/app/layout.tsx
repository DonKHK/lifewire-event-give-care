import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
    <html lang="zh-HK" className={inter.variable}>
      <body className="min-h-screen bg-[#2A9D8F] antialiased">
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}