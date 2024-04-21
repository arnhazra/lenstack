"use client"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import { TierCardComponent } from "@/components/tiercard"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Error from "@/components/error"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const pricing = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [selectedPlan, setSelectedPlan] = useState("premium")

  const handlePayment = async () => {
    if (userState.hasActiveSubscription) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">You already have an active subscription</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }

    else {
      try {
        const response = await axios.post(endPoints.createCheckoutSession, { selectedPlan: selectedPlan })
        window.location = response.data.redirectUrl
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Error creating checkout session</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }
    }
  }

  const renderPricing = pricing?.data?.map((pricing: any) => {
    return (
      <li className="flex" key={pricing.planName}>
        <TierCardComponent
          className={cn(pricing.length === 1 && "xl-col-span-2 xl:col-start-2")}
          handleClick={(planName: string): void => setSelectedPlan(planName)}
          isSelected={pricing.planName === selectedPlan}
          {...pricing}
        />
      </li>
    )
  })

  return (
    <Suspense condition={!pricing.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricing.error} fallback={<Error />}>
        <div className="min-h-screen w-full">
          <section id="pricing" className="container py-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Plans
              </h2>
              <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
                Choose an {uiConstants.brandName} subscription plan that"s right for you.
                Downgrade, upgrade or cancel any time.{" "}
                {uiConstants.brandName} offers a variety of plans to meet your requirements.
              </p>
            </div>
            <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none">
              <ul className={cn("mx-auto grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3", pricing?.data?.length > 3 && "2xl:grid-cols-4")}>
                {renderPricing}
              </ul>
            </div>
            <div className="flex items-center justify-center mt-6">
              <Button onClick={handlePayment}>
                <Suspense condition={selectedPlan !== "hobby"} fallback={<>Activate for free</>}>
                  Pay & Subscribe
                </Suspense>
              </Button>
            </div>
          </section>
        </div>
      </Suspense>
    </Suspense>
  )
}