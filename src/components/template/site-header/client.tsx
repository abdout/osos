"use client"

import React from "react"
import { MainNav } from "./main-nav"
import { RightActions } from "./right-actions"
import MobileHeader from "./mobile-header"
import type { Dictionary } from "@/components/internationalization"

interface SiteHeaderClientProps {
  isAuthenticated: boolean
  dictionary: Dictionary
}

export default function SiteHeaderClient({
  isAuthenticated,
  dictionary,
}: SiteHeaderClientProps) {
  return (
    <>
      {/* Desktop Header */}
      <header className="fixed z-50 top-0 left-0 right-0 hidden md:block bg-background">
        <div className="layout-container">
          <div className="flex h-16 items-center">
            {/* Logo - Left */}
            <MainNav dictionary={dictionary} />
            {/* Sign Up - Right */}
            <RightActions isAuthenticated={isAuthenticated} dictionary={dictionary} />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader isAuthenticated={isAuthenticated} dictionary={dictionary} />
    </>
  )
}
