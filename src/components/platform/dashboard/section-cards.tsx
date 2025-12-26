"use client"

import {
  IconTrendingDown,
  IconTrendingUp,
  IconShip,
  IconTruck,
  IconFileDescription,
  IconReceipt,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Dictionary } from "@/components/internationalization"

interface SectionCardsProps {
  dictionary: Dictionary
  stats: {
    totalProjects: { value: number; trend: number }
    inProgress: { value: number; trend: number }
    pendingInspection: { value: number; trend: number }
    unpaidInvoices: { value: string; trend: number }
  }
}

export function SectionCards({ dictionary, stats }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{dictionary.dashboard.totalProjects}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalProjects.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.totalProjects.trend >= 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {stats.totalProjects.trend >= 0 ? "+" : ""}
              {stats.totalProjects.trend}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.totalProjects.trend >= 0
              ? dictionary.dashboard.trendingUp || "Trending up this month"
              : dictionary.dashboard.trendingDown || "Down this period"}
            {stats.totalProjects.trend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <IconShip className="size-4" />
            {dictionary.navigation.projects}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{dictionary.dashboard.inProgress}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.inProgress.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.inProgress.trend >= 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {stats.inProgress.trend >= 0 ? "+" : ""}
              {stats.inProgress.trend}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.inProgress.trend >= 0
              ? dictionary.dashboard.trendingUp || "Trending up this month"
              : dictionary.dashboard.trendingDown || "Down this period"}
            {stats.inProgress.trend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <IconTruck className="size-4" />
            {dictionary.projects.status}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{dictionary.dashboard.pendingInspection}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.pendingInspection.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.pendingInspection.trend >= 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {stats.pendingInspection.trend >= 0 ? "+" : ""}
              {stats.pendingInspection.trend}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.pendingInspection.trend <= 0
              ? dictionary.dashboard.trendingUp || "Processing smoothly"
              : dictionary.dashboard.trendingDown || "Needs attention"}
            {stats.pendingInspection.trend <= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <IconFileDescription className="size-4" />
            {dictionary.navigation.certificates}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{dictionary.dashboard.unpaidInvoices}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.unpaidInvoices.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.unpaidInvoices.trend >= 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {stats.unpaidInvoices.trend >= 0 ? "+" : ""}
              {stats.unpaidInvoices.trend}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.unpaidInvoices.trend <= 0
              ? dictionary.dashboard.trendingUp || "Collections improving"
              : dictionary.dashboard.trendingDown || "Follow up needed"}
            {stats.unpaidInvoices.trend <= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <IconReceipt className="size-4" />
            {dictionary.navigation.invoices}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
