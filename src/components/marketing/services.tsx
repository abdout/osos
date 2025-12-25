'use client'

import Image from 'next/image'
import { Dictionary } from '@/components/internationalization/types'

interface ServicesProps {
  dictionary: Dictionary
}

export function Services({ dictionary }: ServicesProps) {
  const { services } = dictionary.marketing

  const items = [
    {
      type: services.items.sea.type,
      tags: [services.items.sea.tag1, services.items.sea.tag2],
      title: services.items.sea.title,
      description: services.items.sea.description,
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop',
    },
    {
      type: services.items.air.type,
      tags: [services.items.air.tag1, services.items.air.tag2],
      title: services.items.air.title,
      description: services.items.air.description,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
    },
    {
      type: services.items.ground.type,
      tags: [services.items.ground.tag1, services.items.ground.tag2],
      title: services.items.ground.title,
      description: services.items.ground.description,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14">
          <div className="lg:max-w-2xl">
            <span className="inline-block text-xs font-medium tracking-wider text-gray-500 uppercase mb-4 px-4 py-1.5 border border-gray-200 rounded-full">
              {services.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.15]">
              {services.title}
            </h2>
          </div>
          <p className="text-gray-500 lg:max-w-sm lg:text-right lg:pt-12">
            {services.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="group">
              {/* Image with Tags */}
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {/* Tags overlay */}
                <div className="absolute inset-0 p-5 flex flex-col items-start gap-2">
                  <span className="px-4 py-2 bg-black/25 backdrop-blur-md border border-white/60 rounded-full text-sm font-medium text-white">
                    {item.type}
                  </span>
                  <span className="px-4 py-2 bg-black/25 backdrop-blur-md border border-white/60 rounded-full text-sm font-medium text-white">
                    {item.tags[0]}
                  </span>
                  <span className="px-4 py-2 bg-black/25 backdrop-blur-md border border-white/60 rounded-full text-sm font-medium text-white">
                    {item.tags[1]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
