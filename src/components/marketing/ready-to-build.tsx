"use client";

import React from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Dictionary } from "@/components/internationalization/types";

interface ReadyToBuildSectionProps {
  dictionary: Dictionary;
}

function ReadyToBuildSection({ dictionary }: ReadyToBuildSectionProps) {
  const { testimonial } = dictionary.marketing;

  return (
    <section
      className="bg-[#266DF0] py-8 md:py-12 overflow-hidden"
      data-section="ready-to-build"
    >
      <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
        <div className="flex-1 max-w-xl">
          <blockquote className="text-[#A0BFF8] text-lg md:text-xl leading-relaxed mb-5">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">AH</span>
            </div>
            <div>
              <p className="text-white font-semibold">{testimonial.author}</p>
              <p className="text-[#A0BFF8] text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <OptimizedImage
            src="/marketing/site/build.png"
            alt="logistics illustration"
            width={350}
            height={350}
            className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] object-contain md:-my-16"
          />
        </div>
      </div>
    </section>
  );
}

export default ReadyToBuildSection;
