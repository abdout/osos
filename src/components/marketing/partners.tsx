'use client'

import Image from 'next/image'

const sponsors = [
  { name: 'Faisal', src: '/marketing/sponser/faisal.png', width: 100, height: 50, grayscale: false, smaller: false },
  { name: 'WHO', src: '/marketing/sponser/who.svg', width: 100, height: 50, grayscale: true, smaller: false },
  { name: 'MTDT', src: '/marketing/sponser/mtdt.png', width: 100, height: 50, grayscale: false, smaller: false },
  { name: 'Zain', src: '/marketing/sponser/zain.png', width: 90, height: 45, grayscale: false, smaller: true },
  { name: 'Khartoum', src: '/marketing/sponser/khartoum.png', width: 100, height: 50, grayscale: false, smaller: false },
  { name: 'USAID', src: '/marketing/sponser/usaid.svg', width: 100, height: 50, grayscale: true, smaller: false },
  { name: 'Dal', src: '/marketing/sponser/dal.png', width: 100, height: 50, grayscale: false, smaller: false },
  { name: '249', src: '/marketing/sponser/249.png', width: 90, height: 45, grayscale: false, smaller: true },
  { name: 'University of Khartoum', src: '/marketing/sponser/uok.png', width: 95, height: 48, grayscale: false, smaller: true },
]

export function Partners() {
  return (
    <section className="pt-8 pb-5 bg-background">
      <div className="layout-container">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className={`${sponsor.smaller ? 'h-10 sm:h-11 lg:h-12' : 'h-11 sm:h-12 lg:h-14'} w-auto object-contain transition-all duration-300 grayscale opacity-50 hover:opacity-80 dark:invert dark:opacity-70 dark:hover:opacity-100`}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
