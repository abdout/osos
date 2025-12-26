'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const sponsors = [
  { name: 'Faisal', src: '/marketing/sponser/faisal.png' },
  { name: 'WHO', src: '/marketing/sponser/who.svg' },
  { name: 'MTDT', src: '/marketing/sponser/mtdt.png' },
  { name: 'Zain', src: '/marketing/sponser/zain.png' },
  { name: 'Khartoum', src: '/marketing/sponser/khartoum.png' },
  { name: 'USAID', src: '/marketing/sponser/usaid.svg' },
  { name: 'Dal', src: '/marketing/sponser/dal.png' },
  { name: '249', src: '/marketing/sponser/249.png' },
  { name: 'University of Khartoum', src: '/marketing/sponser/uok.png' },
]

function LogoItem({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <div className="flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[160px] flex items-center justify-center">
      <Image
        src={sponsor.src}
        alt={sponsor.name}
        width={120}
        height={60}
        className="h-8 sm:h-10 lg:h-12 w-auto max-w-[100px] sm:max-w-[120px] object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 dark:invert dark:opacity-70 dark:hover:opacity-100"
        unoptimized
        draggable={false}
      />
    </div>
  )
}

export function Partners() {
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const checkDirection = () => {
      setIsRTL(document.documentElement.dir === 'rtl')
    }
    checkDirection()

    const observer = new MutationObserver(checkDirection)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-8 bg-background overflow-hidden">
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute inset-y-0 start-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r rtl:bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l rtl:bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="overflow-hidden group">
          <div
            className="flex items-center w-max group-hover:[animation-play-state:paused]"
            style={{
              animation: 'partners-scroll 35s linear infinite',
              animationDirection: isRTL ? 'reverse' : 'normal',
            }}
          >
            {/* First set */}
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 pe-6 sm:pe-8 lg:pe-10">
              {sponsors.map((sponsor, index) => (
                <LogoItem key={`first-${index}`} sponsor={sponsor} />
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 pe-6 sm:pe-8 lg:pe-10">
              {sponsors.map((sponsor, index) => (
                <LogoItem key={`second-${index}`} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
