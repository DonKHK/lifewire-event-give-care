"use client";

import { useState, useCallback } from "react";
import { HeroSection } from "@/components/hero-section";
import { StatsRow } from "@/components/stats-row";
import { CTASection } from "@/components/cta-section";
import { PhotoCard } from "@/components/photo-card";
import { LeaderboardSection } from "@/components/leaderboard-section";
import { DonationModal } from "@/components/donation-modal";
import { mockEvent, mockPhotos } from "@/lib/data";
import { Image, ArrowUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [donationOpen, setDonationOpen] = useState(false);

  const handleLike = useCallback((photoId: string) => {
    setLikedIds((prev) => {
      const isCurrentlyLiked = prev.has(photoId);
      const next = new Set(prev);
      if (isCurrentlyLiked) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      // Optimistic like count update inside the same setter
      setPhotos((photosPrev) =>
        photosPrev.map((p) =>
          p.id === photoId
            ? { ...p, likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1 }
            : p
        )
      );
      return next;
    });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <HeroSection event={mockEvent} />

      {/* Stats */}
      <StatsRow
        photos={mockEvent.stats.photos}
        supports={mockEvent.stats.supports}
        demoRaised={mockEvent.stats.demoRaised}
        familiesHelped={mockEvent.stats.familiesHelped}
      />

      {/* Donation Plans Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            捐款支持 rare disease 家庭
          </h2>
          <p className="mt-2 text-sm text-white/70">
            每一份捐款都係一份希望，幫助 rare disease 家庭走過難關
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Plan 1 - HKD 100 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5F3] text-2xl">
              💚
            </div>
            <div className="mb-1 text-3xl font-bold text-[#1E293B]">
              HK$100
            </div>
            <div className="mb-4 text-sm font-medium text-[#2A9D8F]">
              暖心支持
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              為一個 rare disease 家庭提供一日基本物資
            </p>
            <Button
              onClick={() => setDonationOpen(true)}
              className="w-full bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              立即捐款
            </Button>
          </div>

          {/* Plan 2 - HKD 300 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0">
              <div className="rounded-bl-xl bg-[#E8F5F3] px-3 py-1 text-xs font-semibold text-[#2A9D8F]">
                熱門
              </div>
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF0ED] text-2xl">
              💪
            </div>
            <div className="mb-1 text-3xl font-bold text-[#1E293B]">
              HK$300
            </div>
            <div className="mb-4 text-sm font-medium text-[#E76F51]">
              力量凝聚
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              支持一次專業家庭輔導服務
            </p>
            <Button
              onClick={() => setDonationOpen(true)}
              className="w-full bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              立即捐款
            </Button>
          </div>

          {/* Plan 3 - HKD 500 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5F3] text-2xl">
              🌟
            </div>
            <div className="mb-1 text-3xl font-bold text-[#1E293B]">
              HK$500
            </div>
            <div className="mb-4 text-sm font-medium text-[#2A9D8F]">
              希望之光
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              資助一次重要醫療檢查
            </p>
            <Button
              onClick={() => setDonationOpen(true)}
              className="w-full bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              立即捐款
            </Button>
          </div>

          {/* Plan 4 - HKD 1000 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF0ED] text-2xl">
              ❤️
            </div>
            <div className="mb-1 text-3xl font-bold text-[#1E293B]">
              HK$1,000
            </div>
            <div className="mb-4 text-sm font-medium text-[#E76F51]">
              大愛無疆
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              全面支援一個 rare disease 家庭一個月
            </p>
            <Button
              onClick={() => setDonationOpen(true)}
              className="w-full bg-[#E76F51] font-semibold text-white shadow-lg shadow-[#E76F51]/20 transition-all hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              立即捐款
            </Button>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <DonationModal
        open={donationOpen}
        onOpenChange={setDonationOpen}
      />

      {/* Photo Gallery Section */}
      <section className="bg-white dark:bg-[#0d1a17] mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 my-12 rounded-2xl shadow-xl shadow-[#2A9D8F]/20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1E293B] dark:text-gray-100 sm:text-3xl">
              活動相片
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              每一張相片都係一個溫暖嘅故事
            </p>
          </div>
          <Link href="/upload">
            <Button className="bg-[#2A9D8F] text-white shadow-md shadow-[#2A9D8F]/20 hover:bg-[#248f82]">
              <Image className="mr-2 h-4 w-4" />
              上載相片
            </Button>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <PhotoCard
                photo={photo}
                liked={likedIds.has(photo.id)}
                onLike={handleLike}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Section */}
      <LeaderboardSection likedIds={likedIds} onLike={handleLike} />

      {/* CTA Section */}
      <CTASection />

      {/* Scroll to top */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-[#2A9D8F] text-white shadow-lg shadow-[#2A9D8F]/30 hover:bg-[#248f82]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}