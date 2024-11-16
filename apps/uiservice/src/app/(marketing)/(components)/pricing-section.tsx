"use client"
import { buttonVariants } from "@/shared/components/ui/button"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import useGeneralQuery from "@/shared/hooks/use-general-query"
import { cn } from "@/shared/lib/utils"
import { Subscription } from "@/shared/types"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  const pricing = useGeneralQuery(
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
            <h2 className="font-bold text-md capitalize text-slate-700">
              {tier.subscriptionTier}
            </h2>
            <div className="flex">
              <h2 className="font-bold text-3xl capitalize">${tier.price}</h2>
              <span className="flex flex-col justify-end text-sm mb-1">
                /month
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-sm mt-4 mb-4">{tier.features[0]}</p>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            {tier.features.slice(1).map((feature) => (
              <li
                className="flex text-xs items-center text-slate-600"
                key={feature}
              >
                <CheckCircle2 className="scale-75 me-2" />
                {feature}
              </li>
            ))}
            <li
              className="flex text-xs items-center text-slate-600"
              key={tier.xp}
            >
              <CheckCircle2 className="scale-75 me-2" />
              {tier.xp} XP for a month
            </li>
          </ul>
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
      <div className="mx-auto flex max-w-[70rem] flex-col items-center justify-center gap-4 text-center mb-8">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
          {uiConstants.pricingTierHeader}
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[70rem] md:grid-cols-2 lg:grid-cols-4">
        {renderPricingTiers}
      </div>
    </section>
  )
}
