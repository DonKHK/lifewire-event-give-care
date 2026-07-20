"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Shield, Plus, Image, Heart, PiggyBank, Trophy, Star, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockEvent, mockPhotos, mockTopSupporters, getMostLikedPhoto } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import type { Photo } from "@/types";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [eventTitle, setEventTitle] = useState(mockEvent.title);
  const [eventDate, setEventDate] = useState(mockEvent.date);
  const [eventDescription, setEventDescription] = useState(mockEvent.description);
  const [saved, setSaved] = useState(false);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);

  const mostLikedPhoto = getMostLikedPhoto();

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-white" />
          <p className="mt-3 text-sm text-white/70">載入中...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin || !user) {
    return null;
  }

  const removePhoto = (id: string) => {
    // TODO: Also delete from Supabase Storage and Database
    setPhotos(photos.filter((p) => p.id !== id));
  };

  const handleSaveEvent = () => {
    // TODO: Save event to Supabase database
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A9D8F]/10">
              <Shield className="h-5 w-5 text-[#2A9D8F]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1E293B] dark:text-gray-100 sm:text-3xl">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                管理活動資料同相片審核
              </p>
            </div>
          </div>
          <Separator className="mt-6" />
        </div>

        {/* Create new event button — prominent white card */}
        <div className="mb-8">
          <Card className="border-0 bg-white p-6 shadow-xl shadow-[#2A9D8F]/20">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3]">
                <Plus className="h-6 w-6 text-[#2A9D8F]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1E293B]">建立新活動</h3>
                <p className="text-xs text-slate-400">建立一個全新嘅活動，開始收集相片同捐款</p>
              </div>
              <Dialog>
                <DialogTrigger render={<Button size="xl" className="bg-[#2A9D8F] text-white shadow-lg shadow-[#2A9D8F]/30 hover:bg-[#248f82] hover:shadow-[#2A9D8F]/40 transition-all" />}>
                  <Plus className="mr-2 h-5 w-5" />
                  建立新活動
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>建立新活動</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* TODO: Create event form with Supabase integration */}
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      TODO: 整合 Supabase Database，建立新活動記錄
                    </p>
                    <Input
                      placeholder="活動名稱"
                      className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F]"
                    />
                    <Input
                      placeholder="活動日期"
                      className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F]"
                    />
                    <Textarea
                      placeholder="活動描述"
                      className="min-h-[100px] resize-none border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F]"
                    />
                    <Button
                      size="lg"
                      className="w-full bg-[#2A9D8F] text-white hover:bg-[#248f82]"
                    >
                      建立活動
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        {/* ── Event Stats Row ── */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-4 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5F3]">
              <Image className="h-5 w-5 text-[#2A9D8F]" />
            </div>
            <span className="text-xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-2xl">
              {mockEvent.stats.photos.toLocaleString()}
            </span>
            <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400">總相片數</p>
          </Card>
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-4 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF0ED]">
              <Heart className="h-5 w-5 text-[#E76F51]" />
            </div>
            <span className="text-xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-2xl">
              {mockEvent.stats.supports.toLocaleString()}
            </span>
            <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400">總支持次數</p>
          </Card>
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-4 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5F3]">
              <PiggyBank className="h-5 w-5 text-[#2A9D8F]" />
            </div>
            <span className="text-xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-2xl">
              ${mockEvent.stats.demoRaised.toLocaleString()}
            </span>
            <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400">籌款總額 (HKD)</p>
          </Card>
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-4 text-center shadow-xl shadow-[#2A9D8F]/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF0ED]">
              <TrendingUp className="h-5 w-5 text-[#E76F51]" />
            </div>
            <span className="text-xl font-extrabold text-[#1E293B] dark:text-gray-100 sm:text-2xl">
              {mostLikedPhoto ? mostLikedPhoto.likes : 0}
            </span>
            <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400">最多 Like</p>
          </Card>
        </div>

        {/* ── Most Liked Photo + Top Supporters ── */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Most Liked Photo */}
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold text-[#1E293B] dark:text-gray-100">最多人支持嘅相片</h2>
            </div>
            {mostLikedPhoto && (
              <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-gray-700">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={mostLikedPhoto.imageUrl}
                    alt={mostLikedPhoto.caption}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-gray-300">
                    {mostLikedPhoto.caption}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={mostLikedPhoto.uploader.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {mostLikedPhoto.uploader.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-slate-500 dark:text-gray-400">
                        {mostLikedPhoto.uploader.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#E76F51]">
                      <Heart className="h-4 w-4 fill-[#E76F51]" />
                      <span className="text-sm font-bold">{mostLikedPhoto.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Top Supporters 🏆 */}
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-[#E76F51]" />
              <h2 className="text-lg font-bold text-[#1E293B] dark:text-gray-100">Top Supporters</h2>
            </div>
            <div className="space-y-3">
              {mockTopSupporters.map((supporter, index) => (
                <div
                  key={supporter.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-gray-700 p-3 transition-all hover:border-slate-200 dark:hover:border-gray-600"
                >
                  {/* Rank Badge */}
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0
                        ? "bg-amber-100 text-amber-700"
                        : index === 1
                        ? "bg-slate-100 text-slate-600"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-50 dark:bg-gray-700 text-slate-400 dark:text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={supporter.avatar} />
                    <AvatarFallback className="text-xs font-bold text-[#2A9D8F] bg-[#E8F5F3]">
                      {supporter.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                      {supporter.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-gray-500">
                      守護咗 {supporter.supports} 次
                    </p>
                  </div>
                  <Heart className="h-4 w-4 text-[#E76F51]" />
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-100 dark:border-gray-700 pt-4 text-center">
              <p className="text-xs text-slate-400 dark:text-gray-500">
                🏅 頭 5 位守護者 — 每人都係 rare disease 家庭嘅希望
              </p>
            </div>
          </Card>
        </div>

        {/* ── Existing: Edit Event + Photo Moderation Grid ── */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create/Edit Event Form */}
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-[#1E293B] dark:text-gray-100">
              編輯活動資料
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  活動名稱
                </label>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  日期與時間
                </label>
                <Input
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  活動描述
                </label>
                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="min-h-[120px] resize-none border-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]"
                />
              </div>
              <Button
                onClick={handleSaveEvent}
                size="lg"
                className="w-full bg-[#2A9D8F] text-white hover:bg-[#248f82]"
              >
                {saved ? "✓ 已儲存" : "儲存活動資料"}
              </Button>
            </div>
          </Card>

          {/* Photo Moderation Grid */}
          <Card className="border-0 bg-white dark:bg-[#0d1a17] p-6 shadow-xl shadow-[#2A9D8F]/20 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1E293B] dark:text-gray-100">
                相片審核
              </h2>
              <Badge
                variant="secondary"
                className="bg-[#E8F5F3] dark:bg-[#1a3d38] text-[#2A9D8F]"
              >
                {photos.length} 張
              </Badge>
            </div>

            {/* View Toggle */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setViewAllPhotos(false)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  !viewAllPhotos
                    ? "bg-[#2A9D8F] text-white"
                    : "bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600"
                }`}
              >
                最近
              </button>
              <button
                onClick={() => setViewAllPhotos(true)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewAllPhotos
                    ? "bg-[#2A9D8F] text-white"
                    : "bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600"
                }`}
              >
                全部
              </button>
            </div>

            <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
              {(viewAllPhotos ? photos : photos.slice(0, 5)).map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 p-3 transition-all hover:border-slate-200 dark:hover:border-gray-600"
                >
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={photo.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-gray-300">
                      {photo.uploader.name}
                    </p>
                    <p className="truncate text-xs text-slate-400 dark:text-gray-500">
                      {photo.caption}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 flex-shrink-0 text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {!viewAllPhotos && photos.length > 5 && (
                <button
                  onClick={() => setViewAllPhotos(true)}
                  className="w-full py-2 text-center text-xs font-medium text-[#2A9D8F] hover:underline"
                >
                  顯示全部 {photos.length} 張相片 →
                </button>
              )}
            </div>
          </Card>
        </div>

      </section>
    </div>
  );
}