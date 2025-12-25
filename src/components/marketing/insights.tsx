'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Dictionary } from '@/components/internationalization/types'

interface InsightsProps {
  dictionary: Dictionary
  lang: string
}

export function Insights({ dictionary, lang }: InsightsProps) {
  const { insights } = dictionary.marketing

  const articles = [
    {
      ...insights.articles.article1,
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop',
      slug: 'customs-regulations-2025',
    },
    {
      ...insights.articles.article2,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
      slug: 'optimizing-supply-chain',
    },
    {
      ...insights.articles.article3,
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2070&auto=format&fit=crop',
      slug: 'digital-transformation-logistics',
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        {/* Section Header */}
        <div className="mb-12">
          {/* Badge */}
          <span className="inline-block text-sm font-medium text-gray-900 border border-gray-300 rounded-full px-4 py-1 mb-6">
            {insights.badge}
          </span>

          {/* Title Row with See More Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              {insights.title}
            </h2>
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-1.5 bg-[#1a365d] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#152a4a] transition-colors w-fit shrink-0"
            >
              {insights.viewAll}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer">
              {/* Card Container */}
              <div className="rounded-md overflow-hidden border border-gray-200">
                {/* Image Container */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 end-4">
                    <span className="inline-block bg-white text-gray-900 text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300">
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Content - with border connecting to image */}
                <div className="p-5 space-y-3 bg-white">
                  {/* Category Badge */}
                  <span className="inline-block text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-1">
                    {article.category}
                  </span>

                  {/* Description */}
                  <p className="text-gray-800 text-base leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
