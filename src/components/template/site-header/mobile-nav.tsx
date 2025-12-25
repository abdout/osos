"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNavItem } from "./type"
import { cn } from "@/lib/utils"
import { useLockBody } from "./use-lock-body"
import { useLocale } from "@/components/internationalization"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  onClose?: () => void
  brandName: string
}

export const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  ({ items, children, onClose, brandName }, ref) => {
    useLockBody()
    const { locale } = useLocale()

    return (
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        )}
        onClick={onClose}
      >
        <div
          ref={ref}
          className="relative z-20 grid gap-2 bg-popover text-popover-foreground shadow-md w-screen py-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-3 border-b border-border/50"
          >
            <Image
              src="/logo.png"
              alt={brandName}
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="text-xl font-bold">{brandName}</span>
          </Link>

          <nav className="grid grid-flow-row auto-rows-max">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center py-3 px-6 text-xl font-medium hover:bg-muted transition-colors",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    )
  }
)

MobileNav.displayName = "MobileNav"
