"use client"

import React from "react"
import { MainNav } from "./main-nav"
import { RightActions } from "./right-actions"
import type { Dictionary } from "@/components/internationalization"

interface MobileHeaderProps {
  isAuthenticated: boolean
  dictionary: Dictionary
}

export default function MobileHeader({
  isAuthenticated,
  dictionary,
}: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] md:hidden bg-white border-b border-gray-100">
      <div className="layout-container flex h-14 items-center">
        <div className="flex items-center justify-between w-full">
          <MainNav dictionary={dictionary} />
          <RightActions isAuthenticated={isAuthenticated} dictionary={dictionary} />
        </div>
      </div>
    </header>
  )
}
