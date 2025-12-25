"use client"

import * as React from "react"
import Link from "next/link"
import { useLocale, useSwitchLocaleHref, localeConfig } from "@/components/internationalization"

export function LanguageToggle() {
  const { locale } = useLocale()
  const switchLocaleHref = useSwitchLocaleHref()

  const otherLocale = locale === "ar" ? "en" : "ar"
  const otherLocaleConfig = localeConfig[otherLocale]

  return (
    <Link
      href={switchLocaleHref(otherLocale)}
      className="h-10 w-10 md:h-8 md:w-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-sm font-medium text-gray-600"
      title={otherLocaleConfig.nativeName}
    >
      {otherLocale.toUpperCase()}
    </Link>
  )
}
