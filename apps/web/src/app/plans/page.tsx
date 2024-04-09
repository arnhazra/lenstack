"use client"
import { CircleCheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import Suspense from "@/components/suspense"
import SkeletonLoading from "@/components/skeleton"
export const iframeHeight = "640px"
export const containerClassName = "w-full h-full p-4 lg:p-0"

type TierCardComponentProps = {
  features: string[]
  grantedCredits: number
  isMostEfficient?: boolean
  planName: string
  price: number
}

function TierCardComponent({ grantedCredits, features, isMostEfficient = false, planName, price }: TierCardComponentProps) {
  const router = useRouter()

  return (
    <Card className={cn('w-full cursor-pointer', isMostEfficient && 'ring-2 ring-primary dark:bg-border/50')} onClick={(): void => router.push(`subscription/pay?planName=${planName}`)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={cn('text-lg font-semibold capitalize', isMostEfficient && 'text-primary')}>
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
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          <span className="text-sm font-semibold text-muted-foreground">
            MATIC/month
          </span>
        </p>
        <ul className="space-y-3">
          {features.map(feature => (
            <li key={feature} className="flex items-center gap-x-3 text-sm text-muted-foreground">
              <CircleCheckIcon aria-hidden="true" className="size-5 flex-none text-primary dark:text-foreground" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)

  const displayPricing = pricingDetails?.data?.map((pricing: any) => {
    return (
      <li className="flex" key={pricing.planName}>
        <TierCardComponent
          className={cn(pricing.length === 1 && 'xl-col-span-2 xl:col-start-2')}
          {...pricing}
        />
      </li>
    )
  })

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<SkeletonLoading />}>
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mt-6 text-pretty text-lg text-muted-foreground">
            Find a plan that works
          </p>
        </div>
        <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none">
          <ul className={cn('mx-auto grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3', pricingDetails?.data?.length > 3 && '2xl:grid-cols-4')}>
            {displayPricing}
          </ul>
        </div>
      </div>
    </Suspense>
  )
}