"use client";

import { Camera, Heart, ThumbsUp, ImagePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PhotoCard } from "@/components/photo-card";
import { mockUserProfile, getMyPhotos } from "@/lib/data";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [myPhotos] = useState(getMyPhotos());
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
      return next;
    });
  }, []);

  const { name, avatar, photosUploaded, supportsReceived, likesReceived } =
    mockUserProfile;

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-10 text-center">
          {/* Avatar + Name */}
          <div className="mb-6 inline-block">
            <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
              <Avatar className="h-full w-full ring-4 ring-white/80 shadow-xl shadow-[#2A9D8F]/30">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl font-bold text-[#2A9D8F] bg-[#E8F5F3]">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E76F51] shadow-md">
                <Camera className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {name}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Lifewire 活動參與者
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3]">
              <ImagePlus className="h-6 w-6 text-[#2A9D8F]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-3xl">
              {photosUploaded}
            </span>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-gray-400">
              我已上載 {photosUploaded} 張相
            </p>
          </Card>
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0ED]">
              <Heart className="h-6 w-6 text-[#E76F51]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-3xl">
              {supportsReceived}
            </span>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-gray-400">
              收到 {supportsReceived} 次支持
            </p>
          </Card>
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3]">
              <ThumbsUp className="h-6 w-6 text-[#2A9D8F]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-3xl">
              {likesReceived}
            </span>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-gray-400">
              收到 {likesReceived} 個讚
            </p>
          </Card>
        </div>

        {/* My Photos */}
        <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1E293B] dark:text-gray-100">我嘅相片</h2>
              <p className="text-xs text-slate-400 dark:text-gray-500">
                你喺活動中分享嘅溫暖時刻
              </p>
            </div>
            <Link href="/upload">
              <Button className="bg-[#2A9D8F] text-white shadow-md shadow-[#2A9D8F]/20 hover:bg-[#248f82]">
                <ImagePlus className="mr-2 h-4 w-4" />
                上載更多
              </Button>
            </Link>
          </div>

          {myPhotos.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-gray-700 py-16 text-center">
              <Camera className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-gray-600" />
              <p className="text-sm text-slate-400 dark:text-gray-500">
                未有上載相片
              </p>
              <Link
                href="/upload"
                className="mt-2 inline-block text-sm font-medium text-[#2A9D8F] hover:underline"
              >
                立即上載第一張相
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  liked={likedIds.has(photo.id)}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </Card>

        {/* TODO: Supabase Auth notice */}
        <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-4 text-xs text-white/70 backdrop-blur-sm">
          <p className="font-medium text-white/90">🔧 開發備註</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>TODO: 整合 Supabase Auth 顯示真實用戶資料</li>
            <li>TODO: 從 Supabase Database 查詢用戶上載記錄</li>
            <li>TODO: 支援編輯個人檔案（名稱、頭像）</li>
          </ul>
        </div>
      </section>
    </div>
  );
}