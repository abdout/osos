"use client"

import { LanguageToggle } from "./language-toggle"
import { ModeSwitcher } from "./mode-switcher"

export function RightActions() {
  return (
    <div className="flex items-center gap-1">
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  )
}
