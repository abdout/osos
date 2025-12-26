'use client'

import Image from 'next/image'
import { Dictionary } from '@/components/internationalization/types'

interface TestimonialProps {
  dictionary: Dictionary
}

export function Testimonial({ dictionary }: TestimonialProps) {
  const { testimonial } = dictionary.marketing

  return (
    <section className="py-16 bg-background">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Quote Box */}
          <div className="bg-muted border border-border rounded-2xl p-8 lg:p-10">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-primary font-bold text-lg px-3 py-1 bg-primary/10 rounded">
                {dictionary.common.appName}
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Port Image */}
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop"
              alt="Cargo port with shipping containers"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
