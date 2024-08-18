"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import { TierCardComponent } from "@/components/tiercard"
import { useRouter } from "next/navigation"
import LoadingComponent from "@/components/loading"

export default function Page() {
  const pricing = useQuery(["pricing"], endPoints.getPricingConfig, HTTPMethods.GET)
  const router = useRouter()

  const renderPricing = pricing?.data?.map((pricing: any) => {
    return (
      <TierCardComponent
        key={pricing.planName}
        className={cn(pricing.length === 1 && "xl-col-span-2 xl:col-start-2")}
        handleClick={(): void => router.push("/pricing")}
        {...pricing}
      />
    )
  })

  return (
    <Suspense condition={!pricing.isLoading} fallback={<LoadingComponent />}>
      <div className="min-h-screen w-full">
        <section id="pricing" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
              Choose an {uiConstants.brandName} pricing plan that's right for you.
              Downgrade, upgrade any time.{" "}
              {uiConstants.brandName} offers a variety of plans to meet your requirements.
            </p>
          </div>
          <div className="container flex flex-col gap-6 py-8 md:max-w-[55rem] md:py-12">
            {renderPricing}
          </div>
        </section>
      </div>
    </Suspense>
  )
}