"use client";

import { useState, useCallback } from "react";
import { HeroSection } from "@/components/hero-section";
import { StatsRow } from "@/components/stats-row";
import { CTASection } from "@/components/cta-section";
import { PhotoCard } from "@/components/photo-card";
import { LeaderboardSection } from "@/components/leaderboard-section";
import { mockEvent, mockPhotos } from "@/lib/data";
import { Image, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

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

      {/* Photo Gallery Section */}
      <section className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 my-12 rounded-2xl shadow-xl shadow-[#2A9D8F]/20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl">
              活動相片
            </h2>
            <p className="mt-1 text-sm text-slate-500">
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