'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/components/internationalization/types'

interface FaqProps {
  dictionary: Dictionary
}

export function Faq({ dictionary }: FaqProps) {
  const { faq } = dictionary.marketing
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = [
    faq.items.q1,
    faq.items.q2,
    faq.items.q3,
    faq.items.q4,
    faq.items.q5,
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto" style={{ paddingInline: 'var(--container-padding)' }}>
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {faq.title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-start bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pe-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-5 pb-5 text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
