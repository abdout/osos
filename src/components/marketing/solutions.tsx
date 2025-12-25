'use client'

import Image from 'next/image'
import { MapPin, BarChart3, Bell, Ship, FileCheck, Warehouse } from 'lucide-react'
import { Dictionary } from '@/components/internationalization/types'

interface SolutionsProps {
  dictionary: Dictionary
}

export function Solutions({ dictionary }: SolutionsProps) {
  const { solutions } = dictionary.marketing

  const items = [
    {
      icon: MapPin,
      title: solutions.items.realTime.title,
      description: solutions.items.realTime.description,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: BarChart3,
      title: solutions.items.analytics.title,
      description: solutions.items.analytics.description,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Bell,
      title: solutions.items.automated.title,
      description: solutions.items.automated.description,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: Ship,
      title: solutions.items.multiCarrier.title,
      description: solutions.items.multiCarrier.description,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
    },
    {
      icon: FileCheck,
      title: solutions.items.customs.title,
      description: solutions.items.customs.description,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Warehouse,
      title: solutions.items.warehouse.title,
      description: solutions.items.warehouse.description,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
  ]

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        {/* Section Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold tracking-wider text-[#0ea5e9] uppercase mb-3">
            {solutions.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {solutions.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {solutions.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Solutions Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
              alt="Cargo airplane"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
