"use client"
import { buttonVariants } from "@/components/ui/button"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { cn } from "@/lib/utils"
import { Subscription } from "@/types"
import { CheckCircle2, Link } from "lucide-react"

export default function PricingSection() {
  const pricing = useQuery(
    ["pricing"],
    endPoints.getSubscriptionPricing,
    HTTPMethods.GET
  )

  const renderPricingTiers = pricing?.data?.map((tier: Subscription) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-white"
        key={tier.subscriptionTier}
      >
        <div className="flex flex-col justify-between rounded-md p-6">
          <div className="space-y-2">
            <h2 className="font-bold text-xl capitalize">
              {tier.subscriptionTier}
            </h2>
            <h2 className="font-bold text-3xl capitalize">$ {tier.price}</h2>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {tier.features.map((feature) => (
                <li
                  className="flex text-xs items-center text-zinc-600"
                  key={feature}
                >
                  <CheckCircle2 className="scale-75 me-2" />
                  {feature}
                </li>
              ))}
              <li
                className="flex text-xs items-center text-zinc-600"
                key={tier.xp}
              >
                <CheckCircle2 className="scale-75 me-2" />
                {tier.xp} XP for a month
              </li>
            </ul>
          </div>
          <Link
            className={`${cn(buttonVariants({ variant: "default" }))} mt-4`}
            href="/dashboard"
          >
            Get Started
          </Link>
        </div>
      </div>
    )
  })

  return (
    <section id="pricing" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
          {uiConstants.pricingTierHeader}
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-3">
        {renderPricingTiers}
      </div>
    </section>
  )
}
