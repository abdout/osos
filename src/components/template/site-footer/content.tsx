"use client";

import React from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";
import ReadySection from "./ready";
import { Dictionary } from "@/components/internationalization/types";

interface SiteFooterProps {
  dictionary: Dictionary;
  lang: string;
  isRTL?: boolean;
}

export default function SiteFooter({ dictionary, lang, isRTL = false }: SiteFooterProps) {
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <section className="px-4 md:px-20 pt-10 transition-colors flex-1 flex flex-col bg-[oklch(0.145_0_0)] text-[oklch(0.97_0_0)] border-[oklch(0.922_0_0)]">
        <div>
          <OptimizedImage
            src="/marketing/site/logo.png"
            alt="footer logo"
            width={32}
            height={32}
            className="invert"
          />
        </div>

        {/* Mobile Navigation - Hidden on lg+ screens */}
        <MobileNav dictionary={dictionary} />

        <div className="py-10 flex flex-1">
          <MainNav dictionary={dictionary} />
          <ReadySection dictionary={dictionary} lang={lang} isRTL={isRTL} />
        </div>
      </section>
    </div>
  );
}
