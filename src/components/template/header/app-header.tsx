"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  type Dictionary,
  type Locale,
  i18n,
  localeConfig,
  useSwitchLocaleHref,
} from "@/components/internationalization"

interface AppHeaderProps {
  dictionary: Dictionary
  locale: Locale
  user: {
    id: string
    email: string
    name: string | null
    role: string
  }
}

export function AppHeader({ dictionary, locale, user }: AppHeaderProps) {
  const pathname = usePathname()
  const switchLocaleHref = useSwitchLocaleHref()

  const getPageTitle = () => {
    if (pathname.includes('/dashboard')) return dictionary.dashboard.title
    if (pathname.includes('/projects')) return dictionary.projects.title
    if (pathname.includes('/certificates')) return dictionary.certificates.title
    if (pathname.includes('/invoices')) return dictionary.invoices.title
    if (pathname.includes('/settings')) return dictionary.settings.title
    return dictionary.common.appName
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ms-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>

        <div className="ms-auto flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span>{localeConfig[locale].flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{dictionary.settings.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {i18n.locales.map((loc) => (
                <DropdownMenuItem key={loc} asChild>
                  <Link href={switchLocaleHref(loc)} className="cursor-pointer">
                    <span className="me-2">{localeConfig[loc].flag}</span>
                    {localeConfig[loc].nativeName}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user.name || user.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user.name || user.email}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {dictionary.users.roles[user.role as keyof typeof dictionary.users.roles]}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/settings`}>
                  {dictionary.navigation.settings}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
              >
                <LogOut className="h-4 w-4 me-2" />
                {dictionary.navigation.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
