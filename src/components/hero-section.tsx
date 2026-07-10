"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";

interface HeroSectionProps {
  event: Event;
}

export function HeroSection({ event }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2A9D8F] via-[#2A9D8F] to-[#248f82]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
                <Calendar className="h-4 w-4" />
                <span>2026年度慈善活動</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                {event.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-white/80" />
                <span>{event.date}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/upload"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-[#2A9D8F] shadow-lg shadow-black/10 transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/20"
              >
                上載相片
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="border-white/40 font-semibold text-white transition-all hover:bg-white/10"
              >
                守護呢一刻
              </Button>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}