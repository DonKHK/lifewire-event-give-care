"use client";

import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/toast-context";
import { useState } from "react";
import { ShareCardModal } from "@/components/share-card-modal";
import { getMostLikedPhoto } from "@/lib/data";

export function CTASection() {
  const { addToast } = useToast();
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const mostLikedPhoto = getMostLikedPhoto();

  const handleSupport = () => {
    const id = Date.now();
    const x = Math.random() * 200 - 100;
    setHearts((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
    addToast("多謝你守護呢一刻 ❤️ 你嘅支持帶嚟希望！", "love");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#248f82] shadow-xl">
        <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts.map((heart) => (
              <span
                key={heart.id}
                className="absolute bottom-32 left-1/2 text-2xl animate-heart-float"
                style={{ marginLeft: heart.x }}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Decorative hearts */}
          <div className="absolute left-4 top-4 opacity-10">
            <Heart className="h-24 w-24 text-white" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-10">
            <Heart className="h-32 w-32 text-white" />
          </div>

          <div className="relative mx-auto max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              你嘅支持可以守護 rare disease 家庭
            </h2>
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">
              每一張相片、每一個分享、每一份捐款，都係對 rare disease 家庭嘅一份支持。
              分享呢一刻，讓更多人了解同關注。
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="xl"
                onClick={handleSupport}
                className="bg-white px-8 font-semibold text-[#2A9D8F] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl active:scale-95"
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                守護呢一刻 · 支持 rare disease 家庭
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => setShareModalOpen(true)}
                className="border-white/40 font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                <Share2 className="mr-2 h-5 w-5" />
                分享呢一刻
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Card Modal */}
      {mostLikedPhoto && (
        <ShareCardModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          photo={mostLikedPhoto}
        />
      )}
    </section>
  );
}
