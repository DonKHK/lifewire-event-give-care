"use client";

import { Image, Heart, PiggyBank, Home } from "lucide-react";

interface StatsRowProps {
  photos: number;
  supports: number;
  demoRaised: number;
  familiesHelped: number;
}

export function StatsRow({ photos, supports, demoRaised, familiesHelped }: StatsRowProps) {
  return (
    <section className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white px-6 py-8 shadow-xl shadow-[#2A9D8F]/20 sm:px-8 sm:py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="flex flex-col items-center gap-2 p-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3]">
              <Image className="h-6 w-6 text-[#2A9D8F]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
              {photos.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-slate-500">上載相片</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0ED]">
              <Heart className="h-6 w-6 text-[#E76F51]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
              {supports.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-slate-500">守護支持</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5F3]">
              <PiggyBank className="h-6 w-6 text-[#2A9D8F]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
              ${demoRaised.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-slate-500">籌款總額 (HKD)</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0ED]">
              <Home className="h-6 w-6 text-[#E76F51]" />
            </div>
            <span className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
              {familiesHelped.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-slate-500">守護咗嘅家庭</span>
          </div>
        </div>

        {/* Trust Line */}
        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-sm font-medium text-[#2A9D8F]">
            💚 你嘅支持直接幫助 rare disease 家庭，每一份愛都係改變嘅力量
          </p>
        </div>
      </div>
    </section>
  );
}