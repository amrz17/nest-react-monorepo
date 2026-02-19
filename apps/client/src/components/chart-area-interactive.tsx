"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", inbound: 222, outbound: 150 },
  { date: "2024-04-02", inbound: 97, outbound: 180 },
  { date: "2024-04-03", inbound: 167, outbound: 120 },
  { date: "2024-04-04", inbound: 242, outbound: 260 },
  { date: "2024-04-05", inbound: 373, outbound: 290 },
  { date: "2024-04-06", inbound: 301, outbound: 340 },
  { date: "2024-04-07", inbound: 245, outbound: 180 },
  { date: "2024-04-08", inbound: 409, outbound: 320 },
  { date: "2024-04-09", inbound: 59, outbound: 110 },
  { date: "2024-04-10", inbound: 261, outbound: 190 },
  { date: "2024-04-11", inbound: 327, outbound: 350 },
  { date: "2024-04-12", inbound: 292, outbound: 210 },
  { date: "2024-04-13", inbound: 342, outbound: 380 },
  { date: "2024-04-14", inbound: 137, outbound: 220 },
  { date: "2024-04-15", inbound: 120, outbound: 170 },
  { date: "2024-04-16", inbound: 138, outbound: 190 },
  { date: "2024-04-17", inbound: 446, outbound: 360 },
  { date: "2024-04-18", inbound: 364, outbound: 410 },
  { date: "2024-04-19", inbound: 243, outbound: 180 },
  { date: "2024-04-20", inbound: 89, outbound: 150 },
  { date: "2024-04-21", inbound: 137, outbound: 200 },
  { date: "2024-04-22", inbound: 224, outbound: 170 },
  { date: "2024-04-23", inbound: 138, outbound: 230 },
  { date: "2024-04-24", inbound: 387, outbound: 290 },
  { date: "2024-04-25", inbound: 215, outbound: 250 },
  { date: "2024-04-26", inbound: 75, outbound: 130 },
  { date: "2024-04-27", inbound: 383, outbound: 420 },
  { date: "2024-04-28", inbound: 122, outbound: 180 },
  { date: "2024-04-29", inbound: 315, outbound: 240 },
  { date: "2024-04-30", inbound: 454, outbound: 380 },
  { date: "2024-05-01", inbound: 165, outbound: 220 },
  { date: "2024-05-02", inbound: 293, outbound: 310 },
  { date: "2024-05-03", inbound: 247, outbound: 190 },
  { date: "2024-05-04", inbound: 385, outbound: 420 },
  { date: "2024-05-05", inbound: 481, outbound: 390 },
  { date: "2024-05-06", inbound: 498, outbound: 520 },
  { date: "2024-05-07", inbound: 388, outbound: 300 },
  { date: "2024-05-08", inbound: 149, outbound: 210 },
  { date: "2024-05-09", inbound: 227, outbound: 180 },
  { date: "2024-05-10", inbound: 293, outbound: 330 },
  { date: "2024-05-11", inbound: 335, outbound: 270 },
  { date: "2024-05-12", inbound: 197, outbound: 240 },
  { date: "2024-05-13", inbound: 197, outbound: 160 },
  { date: "2024-05-14", inbound: 448, outbound: 490 },
  { date: "2024-05-15", inbound: 473, outbound: 380 },
  { date: "2024-05-16", inbound: 338, outbound: 400 },
  { date: "2024-05-17", inbound: 499, outbound: 420 },
  { date: "2024-05-18", inbound: 315, outbound: 350 },
  { date: "2024-05-19", inbound: 235, outbound: 180 },
  { date: "2024-05-20", inbound: 177, outbound: 230 },
  { date: "2024-05-21", inbound: 82, outbound: 140 },
  { date: "2024-05-22", inbound: 81, outbound: 120 },
  { date: "2024-05-23", inbound: 252, outbound: 290 },
  { date: "2024-05-24", inbound: 294, outbound: 220 },
  { date: "2024-05-25", inbound: 201, outbound: 250 },
  { date: "2024-05-26", inbound: 213, outbound: 170 },
  { date: "2024-05-27", inbound: 420, outbound: 460 },
  { date: "2024-05-28", inbound: 233, outbound: 190 },
  { date: "2024-05-29", inbound: 78, outbound: 130 },
  { date: "2024-05-30", inbound: 340, outbound: 280 },
  { date: "2024-05-31", inbound: 178, outbound: 230 },
  { date: "2024-06-01", inbound: 178, outbound: 200 },
  { date: "2024-06-02", inbound: 470, outbound: 410 },
  { date: "2024-06-03", inbound: 103, outbound: 160 },
  { date: "2024-06-04", inbound: 439, outbound: 380 },
  { date: "2024-06-05", inbound: 88, outbound: 140 },
  { date: "2024-06-06", inbound: 294, outbound: 250 },
  { date: "2024-06-07", inbound: 323, outbound: 370 },
  { date: "2024-06-08", inbound: 385, outbound: 320 },
  { date: "2024-06-09", inbound: 438, outbound: 480 },
  { date: "2024-06-10", inbound: 155, outbound: 200 },
  { date: "2024-06-11", inbound: 92, outbound: 150 },
  { date: "2024-06-12", inbound: 492, outbound: 420 },
  { date: "2024-06-13", inbound: 81, outbound: 130 },
  { date: "2024-06-14", inbound: 426, outbound: 380 },
  { date: "2024-06-15", inbound: 307, outbound: 350 },
  { date: "2024-06-16", inbound: 371, outbound: 310 },
  { date: "2024-06-17", inbound: 475, outbound: 520 },
  { date: "2024-06-18", inbound: 107, outbound: 170 },
  { date: "2024-06-19", inbound: 341, outbound: 290 },
  { date: "2024-06-20", inbound: 408, outbound: 450 },
  { date: "2024-06-21", inbound: 169, outbound: 210 },
  { date: "2024-06-22", inbound: 317, outbound: 270 },
  { date: "2024-06-23", inbound: 480, outbound: 530 },
  { date: "2024-06-24", inbound: 132, outbound: 180 },
  { date: "2024-06-25", inbound: 141, outbound: 190 },
  { date: "2024-06-26", inbound: 434, outbound: 380 },
  { date: "2024-06-27", inbound: 448, outbound: 490 },
  { date: "2024-06-28", inbound: 149, outbound: 200 },
  { date: "2024-06-29", inbound: 103, outbound: 160 },
  { date: "2024-06-30", inbound: 446, outbound: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  inbound: {
    label: "Inbound",
    color: "var(--primary)",
  },
  outbound: {
    label: "Outbound",
    color: "var(--secondary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card px-4">
      <CardHeader>
        <CardTitle>Tren Inbound vs Outbound</CardTitle>
        {/* <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription> */}
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillInbound" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-inbound)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-inbound)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-outbound)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-outbound)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="inbound"
              type="natural"
              fill="url(#fillInbound)"
              stroke="var(--color-inbound)"
              stackId="a"
            />
            <Area
              dataKey="outbound"
              type="natural"
              fill="url(#fillOutbound)"
              stroke="var(--color-outbound)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
