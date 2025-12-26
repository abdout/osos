'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Dictionary } from '@/components/internationalization/types'

interface FaqProps {
  dictionary: Dictionary
  lang?: string
}

export function Faq({ dictionary, lang }: FaqProps) {
  const { faq } = dictionary.marketing
  const isRTL = lang === 'ar'

  const items = [
    faq.items.q1,
    faq.items.q2,
    faq.items.q3,
    faq.items.q4,
    faq.items.q5,
  ]

  return (
    <section id="faq" className="py-16 md:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="grid gap-y-12 lg:grid-cols-[1fr_2fr] lg:gap-x-12">
          {/* Left side - Title */}
          <div className="text-center lg:text-start">
            <h2 className="mb-4 text-4xl font-extrabold whitespace-pre-line md:text-5xl text-foreground">
              <span className="md:hidden">{faq.titleMobile}</span>
              <span className="hidden md:inline">{faq.title}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {faq.subtitle}
            </p>
          </div>

          {/* Right side - Accordion */}
          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-xl lg:mx-0 lg:ms-auto">
            <Accordion type="single" collapsible defaultValue="item-0">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-start">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-start">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
