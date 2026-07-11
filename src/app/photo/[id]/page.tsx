"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPhotoById } from "@/lib/data";
import {
  Heart,
  Share2,
  Flag,
  ChevronLeft,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/cta-section";
import { ShareCardModal } from "@/components/share-card-modal";
import { ReportModal } from "@/components/report-modal";
import { DonationModal } from "@/components/donation-modal";

export default function PhotoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const photo = getPhotoById(id);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(photo?.likes ?? 0);

  if (!photo) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-medium text-slate-600 dark:text-gray-300">
          相片未揾到
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="border-[#2A9D8F] text-[#2A9D8F]"
        >
          返回首頁
        </Button>
      </div>
    );
  }

  const toggleLike = () => {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <div className="animate-fade-in min-h-screen">
      {/* Back Button */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-gray-400 transition-colors hover:text-[#2A9D8F]"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          返回
        </button>
      </div>

      {/* Photo Detail */}
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#0d1a17] shadow-xl shadow-[#2A9D8F]/20">
          {/* Large Photo */}
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-gray-800 sm:aspect-[16/9]">
            <img
              src={photo.imageUrl}
              alt={photo.caption}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Photo Info */}
          <div className="space-y-6 p-6 sm:p-8">
            {/* Uploader Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-[#2A9D8F]/20">
                  <AvatarImage src={photo.uploader.avatar} />
                  <AvatarFallback className="bg-[#E8F5F3] text-[#2A9D8F]">
                    {photo.uploader.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B] dark:text-gray-100">
                    {photo.uploader.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(photo.createdAt).toLocaleDateString("zh-HK")}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-[#E8F5F3] dark:bg-[#1a3d38] text-[#2A9D8F] hover:bg-[#E8F5F3] dark:hover:bg-[#1a3d38]"
              >
                <Heart className="mr-1 h-3.5 w-3.5 fill-[#2A9D8F] text-[#2A9D8F]" />
                {likeCount} 個守護
              </Badge>
            </div>

            {/* Caption */}
            <div className="rounded-xl bg-[#F8FAFC] dark:bg-gray-800 p-4">
              <p className="text-base leading-relaxed text-slate-700 dark:text-gray-300 sm:text-lg">
                {photo.caption}
              </p>
            </div>

            {/* Action Buttons */}
            {/* Donation + Like Row */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="xl"
                onClick={() => setDonationModalOpen(true)}
                className="flex-1 bg-[#2A9D8F] font-semibold text-white shadow-lg shadow-[#2A9D8F]/20 transition-all hover:bg-[#248f82] hover:shadow-xl hover:shadow-[#2A9D8F]/30"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                捐款支持
              </Button>
              <div className="flex gap-3">
                <Button
                  size="xl"
                  onClick={toggleLike}
                  className={`flex-1 font-semibold text-white shadow-lg transition-all ${
                    liked
                      ? "bg-slate-400 shadow-slate-400/20 hover:bg-slate-500 hover:shadow-slate-500/30"
                      : "bg-[#E76F51] shadow-[#E76F51]/20 hover:bg-[#d66042] hover:shadow-xl hover:shadow-[#E76F51]/30"
                  }`}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${
                      liked ? "" : "fill-current"
                    }`}
                  />
                  {liked ? "已守護 💚" : "守護"}
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-slate-300 dark:border-gray-600 text-slate-600 dark:text-gray-300 transition-all hover:bg-slate-50 dark:hover:bg-gray-800"
                  onClick={() => setShareModalOpen(true)}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  分享
                </Button>
              </div>
            </div>

            {/* Share Card Modal */}
            <ShareCardModal
              open={shareModalOpen}
              onOpenChange={setShareModalOpen}
              photo={photo}
            />

            {/* Donation Modal */}
            <DonationModal
              open={donationModalOpen}
              onOpenChange={setDonationModalOpen}
              photoCaption={photo.caption}
            />

            {/* Report Link */}
            <div className="flex justify-center">
              <button
                onClick={() => setReportModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-gray-500 transition-colors hover:text-slate-600 dark:hover:text-gray-300"
              >
                <Flag className="h-3 w-3" />
                舉報不當內容
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      <ReportModal open={reportModalOpen} onOpenChange={setReportModalOpen} />

      <CTASection />
    </div>
  );
}