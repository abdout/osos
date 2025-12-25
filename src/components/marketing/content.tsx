import { Dictionary } from '@/components/internationalization/types'
import { SiteHeader } from '@/components/template/site-header'
import { Hero } from './hero'
import { Partners } from './partners'
import { Services } from './services'
import { Testimonial } from './testimonial'
import { Solutions } from './solutions'
import { AllInOne } from './all-in-one'
import { Insights } from './insights'
import { Faq } from './faq'
import { Footer } from './footer'

interface MarketingContentProps {
  dictionary: Dictionary
  lang: string
}

export function MarketingContent({ dictionary, lang }: MarketingContentProps) {
  return (
    <>
      <SiteHeader dictionary={dictionary} />
      <main className="min-h-screen">
        <Hero dictionary={dictionary} />
        <Partners />
        <Services dictionary={dictionary} />
        <Testimonial dictionary={dictionary} />
        <Solutions dictionary={dictionary} />
        <AllInOne dictionary={dictionary} />
        <Insights dictionary={dictionary} lang={lang} />
        <Faq dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} lang={lang} />
    </>
  )
}
