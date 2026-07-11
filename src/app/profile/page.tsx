"use client";

import { Camera, Heart, ThumbsUp, ImagePlus, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PhotoCard } from "@/components/photo-card";
import { getCurrentProfile, getMyPhotos, updateProfile, updateAvatar } from "@/lib/data";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CameraModal } from "@/components/camera-modal";

export default function ProfilePage() {
  const [profile, setProfile] = useState(getCurrentProfile());
  const [myPhotos] = useState(getMyPhotos());
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  // Edit profile modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editBio, setEditBio] = useState(profile.bio ?? "");
  const [editEmail, setEditEmail] = useState(profile.email ?? "");

  // Camera modal state
  const [cameraOpen, setCameraOpen] = useState(false);

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

  const handleOpenEdit = useCallback(() => {
    setEditName(profile.name);
    setEditBio(profile.bio ?? "");
    setEditEmail(profile.email ?? "");
    setEditOpen(true);
  }, [profile]);

  const handleSaveProfile = useCallback(() => {
    const updated = updateProfile({
      name: editName,
      bio: editBio,
      email: editEmail,
    });
    setProfile(updated);
    setEditOpen(false);
  }, [editName, editBio, editEmail]);

  const handleAvatarUpdate = useCallback((dataUrl: string) => {
    const updated = updateAvatar(dataUrl);
    setProfile(updated);
  }, []);

  const { name, avatar, bio, photosUploaded, supportsReceived, likesReceived } =
    profile;

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
              <button
                onClick={() => setCameraOpen(true)}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#E76F51] shadow-md transition hover:bg-[#d45f3f]"
              >
                <Camera className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {name}
          </h1>
          {bio && (
            <p className="mt-2 max-w-md text-sm text-white/80">{bio}</p>
          )}
          {profile.email && (
            <p className="mt-1 text-xs text-white/50">{profile.email}</p>
          )}
          <p className="mt-2 text-xs text-white/50">
            Lifewire 活動參與者
          </p>
          <button
            onClick={handleOpenEdit}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            <Pencil className="h-4 w-4" />
            編輯個人檔案
          </button>
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
      </section>

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>編輯個人檔案</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                名稱
              </label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="你嘅名稱"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                簡介
              </label>
              <Textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="介紹一下你自己..."
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                電郵
              </label>
              <Input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="email@example.com"
                type="email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              取消
            </Button>
            <Button
              className="bg-[#2A9D8F] text-white hover:bg-[#248f82]"
              onClick={handleSaveProfile}
            >
              儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Camera Modal */}
      <CameraModal
        open={cameraOpen}
        onOpenChange={setCameraOpen}
        onCapture={handleAvatarUpdate}
      />
    </div>
  );
}