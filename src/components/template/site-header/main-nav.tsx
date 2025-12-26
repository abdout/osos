"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelectedLayoutSegment } from "next/navigation"
import { Menu, X } from "lucide-react"
import { MainNavItem } from "./type"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"
import { useLocale } from "@/components/internationalization"
import type { Dictionary } from "@/components/internationalization"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  dictionary: Dictionary
}

export function MainNav({ items, children, dictionary }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const { locale } = useLocale()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  const t = dictionary.header

  const localizedItems: MainNavItem[] = React.useMemo(
    () => [
      { title: t.about, href: `/${locale}#about` },
      { title: t.services, href: `/${locale}#services` },
      { title: t.blog, href: `/${locale}/blog` },
      { title: t.platform, href: `/${locale}/dashboard` },
    ],
    [t, locale]
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false)
      }
    }

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMobileMenu])

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={dictionary.common.appName}
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl text-foreground">
            {dictionary.common.appName}
          </span>
        </Link>
        {/* Nav Links - Beside Logo */}
        <nav className="flex items-center gap-8">
          {localizedItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-base font-medium transition-colors hover:text-foreground",
                item.href.includes(`/${segment}`)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center md:hidden pt-1">
        <button
          className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-muted transition-colors"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <X className="h-7 w-7 text-foreground" strokeWidth={1.5} />
          ) : (
            <Menu className="h-7 w-7 text-foreground" strokeWidth={1.5} />
          )}
        </button>
      </div>
      {showMobileMenu && (
        <MobileNav
          items={localizedItems}
          onClose={() => setShowMobileMenu(false)}
          ref={mobileMenuRef}
          brandName={dictionary.common.appName}
        >
          {children}
        </MobileNav>
      )}
    </>
  )
}
