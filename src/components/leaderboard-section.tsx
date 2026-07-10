"use client";

import Link from "next/link";
import { Heart, Trophy } from "lucide-react";
import { getTopPhotos } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardSectionProps {
  likedIds: Set<string>;
  onLike: (photoId: string) => void;
}

const rankStyles = [
  {
    bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    text: "text-white",
    label: "1",
    glow: "shadow-yellow-400/20",
  },
  {
    bg: "bg-gradient-to-br from-slate-300 to-slate-500",
    text: "text-white",
    label: "2",
    glow: "shadow-slate-400/20",
  },
  {
    bg: "bg-gradient-to-br from-amber-600 to-amber-800",
    text: "text-white",
    label: "3",
    glow: "shadow-amber-600/20",
  },
  {
    bg: "bg-slate-200",
    text: "text-slate-500",
    label: "",
    glow: "",
  },
  {
    bg: "bg-slate-200",
    text: "text-slate-500",
    label: "",
    glow: "",
  },
  {
    bg: "bg-slate-200",
    text: "text-slate-500",
    label: "",
    glow: "",
  },
];

const rankEmojis = ["🥇", "🥈", "🥉"];

export function LeaderboardSection({ likedIds, onLike }: LeaderboardSectionProps) {
  const topPhotos = getTopPhotos(6);

  return (
    <section className="mx-auto max-w-7xl bg-white py-16 mb-12 rounded-2xl shadow-xl shadow-[#2A9D8F]/20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2A9D8F]/10 px-4 py-1.5 text-sm font-medium text-[#2A9D8F]">
            <Trophy className="h-4 w-4" />
            <span>最受支持相片</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl">
            最多「守護」嘅動人時刻 🌟
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            每一票都代表一份愛同支持
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topPhotos.map((photo, index) => {
            const rank = index < 6 ? rankStyles[index] : rankStyles[5];
            const isLiked = likedIds.has(photo.id);

            return (
              <Link
                key={photo.id}
                href={`/photo/${photo.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md shadow-[#2A9D8F]/10 transition-all duration-300 hover:shadow-xl hover:shadow-[#2A9D8F]/30 hover:-translate-y-1"
              >
                {/* Ranking Badge */}
                <div
                  className={`absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-lg ${rank.bg} ${rank.text} ${rank.glow}`}
                >
                  {index < 3 ? rankEmojis[index] : `#${index + 1}`}
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="space-y-2 p-4">
                  <p className="line-clamp-2 text-sm leading-snug text-slate-700">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={photo.uploader.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {photo.uploader.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-slate-500">
                        {photo.uploader.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onLike(photo.id);
                      }}
                      className="flex items-center gap-1 transition-all active:scale-110"
                      aria-label={isLiked ? "取消守護" : "守護呢一刻"}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all ${
                          isLiked
                            ? "fill-[#E76F51] text-[#E76F51]"
                            : "text-slate-400 hover:text-[#E76F51]"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          isLiked ? "text-[#E76F51]" : "text-slate-500"
                        }`}
                      >
                        {photo.likes}
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}