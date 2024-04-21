"use client"
import { CircleCheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type TierCardComponentProps = {
  features: string[]
  grantedCredits: number
  isMostEfficient?: boolean,
  isSelected?: boolean,
  planName: string
  price: number
  handleClick: (planName: string) => void
}

export function TierCardComponent({ grantedCredits, features, isMostEfficient = false, isSelected = false, planName, price, handleClick }: TierCardComponentProps) {
  return (
    <Card className={cn("w-full cursor-pointer", isSelected && "ring-2 ring-primary dark:bg-border/50")} onClick={(): void => handleClick(planName)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={cn("text-lg font-semibold capitalize", isMostEfficient && "text-primary")}>
            {planName}
          </CardTitle>
          {isMostEfficient && (
            <Badge
              className="rounded-full border-primary bg-primary/10 text-primary dark:border-transparent dark:bg-primary dark:text-primary-foreground"
              variant="outline"
            >
              Most Efficient
            </Badge>
          )}
        </div>
        <CardDescription>{grantedCredits} Credits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="flex items-baseline gap-x-1">
          <span className="text-2xl font-semibold text-muted-foreground">
            ₹
          </span>
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          <span className="text-sm font-semibold text-muted-foreground">
            /month
          </span>
        </p>
        <ul className="space-y-3">
          {features.map(feature => (
            <li key={feature} className="flex items-center gap-x-3 text-sm text-gray-600">
              <CircleCheckIcon aria-hidden="true" className="size-5 flex-none text-primary dark:text-foreground" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}