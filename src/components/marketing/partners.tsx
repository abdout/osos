'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const sponsors = [
  { name: 'Faisal', src: '/marketing/sponser/faisal.png', width: 100, height: 50 },
  { name: 'WHO', src: '/marketing/sponser/who.svg', width: 100, height: 50 },
  { name: 'MTDT', src: '/marketing/sponser/mtdt.png', width: 100, height: 50 },
  { name: 'Zain', src: '/marketing/sponser/zain.png', width: 90, height: 45 },
  { name: 'Khartoum', src: '/marketing/sponser/khartoum.png', width: 100, height: 50 },
  { name: 'USAID', src: '/marketing/sponser/usaid.svg', width: 100, height: 50 },
  { name: 'Dal', src: '/marketing/sponser/dal.png', width: 100, height: 50 },
  { name: '249', src: '/marketing/sponser/249.png', width: 90, height: 45 },
  { name: 'University of Khartoum', src: '/marketing/sponser/uok.png', width: 95, height: 48 },
]

function LogoItem({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center mx-8 sm:mx-10 lg:mx-12">
      <Image
        src={sponsor.src}
        alt={sponsor.name}
        width={sponsor.width}
        height={sponsor.height}
        className="h-8 sm:h-10 lg:h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 dark:invert dark:opacity-70 dark:hover:opacity-100"
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

  // Create multiple copies for truly seamless infinite scroll
  const logoSets = [0, 1, 2, 3]

  return (
    <section className="py-8 bg-background overflow-hidden">
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div
          className="flex items-center group"
          style={{
            width: 'fit-content',
          }}
        >
          <div
            className="flex items-center group-hover:[animation-play-state:paused]"
            style={{
              animation: 'partners-scroll 40s linear infinite',
              animationDirection: isRTL ? 'reverse' : 'normal',
              willChange: 'transform',
            }}
          >
            {logoSets.map((setIndex) => (
              <div key={setIndex} className="flex items-center">
                {sponsors.map((sponsor, index) => (
                  <LogoItem key={`set-${setIndex}-${index}`} sponsor={sponsor} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
