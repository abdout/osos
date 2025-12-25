export const siteConfig = {
  name: "Abdout",
  description: "Export/Import Management System for Port Sudan",
  url: "https://abdoutgroup.com",
  ogImage: "https://abdoutgroup.com/og.png",
  links: {
    github: "https://github.com/abdoutgroup/mazin",
  },
  creator: "Abdout Group",
  keywords: [
    "Port Sudan",
    "logistics",
    "export",
    "import",
    "shipping",
    "cargo",
    "Sudan",
    "ميناء بورتسودان",
    "شحن",
    "تصدير",
    "استيراد",
  ],
} as const

export type SiteConfig = typeof siteConfig
