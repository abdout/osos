"use client"

import Link from "next/link"
import { LogIn } from "lucide-react"
import { LanguageToggle } from "./language-toggle"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/internationalization"
import type { Dictionary } from "@/components/internationalization"

interface RightActionsProps {
  isAuthenticated: boolean
  dictionary: Dictionary
}

export function RightActions({ isAuthenticated, dictionary }: RightActionsProps) {
  const { locale } = useLocale()
  const t = dictionary.header

  return (
    <div className="flex items-center gap-3">
      <LanguageToggle />
      {isAuthenticated ? (
        <Link href={`/${locale}/dashboard`}>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            {dictionary.navigation.dashboard}
          </Button>
        </Link>
      ) : (
        <>
          <Link
            href={`/${locale}/login`}
            className="md:hidden h-11 w-11 p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <LogIn className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
          </Link>
          <Link href={`/${locale}/login`} className="hidden md:block">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              {t.signUp}
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
