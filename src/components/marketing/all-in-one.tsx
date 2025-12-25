'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Play } from 'lucide-react'
import { Dictionary } from '@/components/internationalization/types'

interface AllInOneProps {
  dictionary: Dictionary
}

export function AllInOne({ dictionary }: AllInOneProps) {
  const { allInOne } = dictionary.marketing
  const [activeCard, setActiveCard] = useState(0)

  const cards = [
    {
      id: 0,
      type: 'image' as const,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
      tags: ['Control', 'Ops'],
      description: allInOne.features.documentation.description,
    },
    {
      id: 1,
      type: 'illustration' as const,
      bgColor: 'bg-[#f5f3ef]',
      illustration: 'money',
      tags: ['Cost', 'Efficiency'],
      description: allInOne.features.invoicing.description,
    },
    {
      id: 2,
      type: 'illustration' as const,
      bgColor: 'bg-[#e8eef3]',
      illustration: 'package',
      tags: ['Speed', 'Accuracy'],
      description: allInOne.features.access.description,
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        {/* Split Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Badge + Title */}
          <div>
            <span className="inline-block text-xs font-medium tracking-wider text-gray-700 uppercase mb-4 px-4 py-2 border border-gray-300 rounded-full">
              {allInOne.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              {allInOne.title}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="flex items-end">
            <p className="text-lg text-gray-600">
              {allInOne.subtitle}
            </p>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                ${activeCard === card.id
                  ? 'lg:col-span-1 lg:scale-[1.02] z-10 h-[420px]'
                  : 'h-[380px] opacity-90 hover:opacity-100'}
                ${card.type === 'illustration' ? card.bgColor : ''}
              `}
            >
              {card.type === 'image' ? (
                <>
                  <Image
                    src={card.image!}
                    alt="Logistics operations"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-0.5" />
                    </div>
                  </div>

                  {/* Arrow link */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex gap-2 mb-3">
                      {card.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white text-base font-medium leading-snug">
                      {card.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full p-5 flex flex-col">
                  {/* Arrow link */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                    <div className="w-9 h-9 bg-white/60 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Illustration */}
                  <div className="flex-1 flex items-center justify-center">
                    {card.illustration === 'money' ? (
                      <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="35" width="90" height="45" rx="4" fill="#c9a227" />
                        <rect x="15" y="28" width="90" height="45" rx="4" fill="#d4af37" />
                        <rect x="15" y="21" width="90" height="45" rx="4" fill="#e6c547" />
                        <circle cx="60" cy="43" r="14" stroke="#c9a227" strokeWidth="3" fill="none" />
                        <text x="60" y="49" textAnchor="middle" fill="#c9a227" fontSize="16" fontWeight="bold">$</text>
                        <circle cx="115" cy="75" r="14" fill="#d4af37" />
                        <circle cx="115" cy="68" r="14" fill="#e6c547" />
                        <circle cx="100" cy="90" r="11" fill="#d4af37" />
                        <circle cx="100" cy="83" r="11" fill="#e6c547" />
                      </svg>
                    ) : (
                      <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 45 L70 28 L105 45 L105 85 L70 102 L35 85 Z" fill="#c5d5e4" stroke="#8ba3b9" strokeWidth="2" />
                        <path d="M70 28 L70 102" stroke="#8ba3b9" strokeWidth="2" />
                        <path d="M35 45 L70 62 L105 45" stroke="#8ba3b9" strokeWidth="2" />
                        <path d="M70 62 L70 102" stroke="#8ba3b9" strokeWidth="2" />
                        <path d="M35 45 L70 62 L105 45 L70 28 Z" fill="#d8e4ed" />
                        <circle cx="100" cy="32" r="16" fill="#4a90c2" />
                        <path d="M92 32 L98 38 L109 27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <circle cx="28" cy="72" r="10" fill="#4a90c2" />
                        <circle cx="28" cy="72" r="4" fill="white" />
                      </svg>
                    )}
                  </div>

                  {/* Content at bottom */}
                  <div className="mt-auto">
                    <div className="flex gap-2 mb-3">
                      {card.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base leading-snug">
                      {card.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
