"use client"

import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()

  const currentLang = pathname.split("/")[1] || "en"
  const nextLang = currentLang === "ar" ? "en" : "ar"

  const switchLanguage = () => {
    const segments = pathname.split("/")
    segments[1] = nextLang
    document.cookie = `NEXT_LOCALE=${nextLang}; path=/; max-age=31536000; samesite=lax`
    router.push(segments.join("/"))
  }

  return (
    <Button
      variant="link"
      size="icon"
      className="size-10 cursor-pointer text-foreground"
      onClick={switchLanguage}
    >
      <Languages className="size-5" />
      <span className="sr-only">
        Switch to {nextLang === "ar" ? "Arabic" : "English"}
      </span>
    </Button>
  )
}
