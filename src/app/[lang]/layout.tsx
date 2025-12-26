import { SessionProvider } from "next-auth/react"
import { i18n, type Locale, localeConfig } from "@/components/internationalization"
import { ThemeProvider } from "@/components/providers"
import { fontSans, fontRubik, fontVariables } from "@/components/atom/fonts"
import { cn } from "@/lib/utils"
import "../globals.css"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dir = localeConfig[lang]?.dir ?? "ltr"

  // Use Rubik font for Arabic, Geist for English
  const fontClass = lang === "ar" ? fontRubik.className : fontSans.className

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className={cn(fontClass, fontVariables, "antialiased")}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
