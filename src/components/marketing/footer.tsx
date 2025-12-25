'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Dictionary } from '@/components/internationalization/types'

interface FooterProps {
  dictionary: Dictionary
  lang: string
}

export function Footer({ dictionary, lang }: FooterProps) {
  const { footer } = dictionary.marketing
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="py-16" style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="text-2xl font-bold mb-4 block">
              {dictionary.common.appName}
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#features`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.features}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#tracking`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.tracking}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#solutions`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.solutions}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#pricing`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.pricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{footer.services}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}/services/import`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.import}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services/export`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.export}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services/warehouse`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.warehouse}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services/transport`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.links.transport}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{footer.contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/60 flex-shrink-0" />
                <a href={`tel:${footer.contactInfo.phone}`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60 flex-shrink-0" />
                <a href={`mailto:${footer.contactInfo.email}`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {footer.contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="py-6" style={{ paddingInline: 'var(--container-padding)' }}>
          <p className="text-center text-white/40 text-sm">
            &copy; {currentYear} {dictionary.common.appName}. {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
