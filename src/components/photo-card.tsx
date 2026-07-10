"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Photo } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface PhotoCardProps {
  photo: Photo;
  liked?: boolean;
  onLike?: (photoId: string) => void;
}

export function PhotoCard({ photo, liked = false, onLike }: PhotoCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.(photo.id);
  };

  return (
    <Link href={`/photo/${photo.id}`} className="group block">
      <Card className="overflow-hidden border-0 bg-white shadow-md shadow-[#2A9D8F]/10 transition-all duration-300 hover:shadow-xl hover:shadow-[#2A9D8F]/30 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
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
              onClick={handleLike}
              className="flex items-center gap-1 transition-all active:scale-110"
              aria-label={liked ? "取消守護" : "守護呢一刻"}
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  liked
                    ? "fill-[#E76F51] text-[#E76F51]"
                    : "text-slate-400 hover:text-[#E76F51]"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  liked ? "text-[#E76F51]" : "text-slate-500"
                }`}
              >
                {photo.likes}
              </span>
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}