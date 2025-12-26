'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/components/internationalization/types'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  const { hero } = dictionary.marketing

  return (
    <section className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center" style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="max-w-lg">
          {/* Badge */}
          <span className="inline-block text-xs font-semibold tracking-wider text-white/80 uppercase mb-4">
            {hero.badge}
          </span>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
            <span className="block">{hero.titleLine1}</span>
            <span className="block whitespace-nowrap">{hero.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Track Input with Button */}
          <div className="relative inline-flex items-center">
            <input
              type="text"
              placeholder={hero.trackPlaceholder}
              className="h-12 w-80 ps-5 pe-28 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <Button
              size="sm"
              className="absolute end-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium h-9 px-5 gap-1.5 rounded-full"
            >
              <Search className="w-4 h-4" />
              {hero.trackButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
