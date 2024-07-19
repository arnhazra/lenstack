"use client"
import { uiConstants } from "@/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { TierCardComponent } from "@/components/tiercard"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import axios from "axios"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const pricing = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)

  const handlePayment = async (selectedPlan: string) => {
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

  const renderPricing = pricing?.data?.map((plan: any) => {
    return (
      <TierCardComponent
        disabled={userState.hasActiveSubscription}
        key={plan.planName}
        handleClick={(planName: string): Promise<void> => handlePayment(planName)}
        {...plan}
      />
    )
  })

  return (
    <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-slate-700 sm:text-lg sm:leading-7">
          Unlock all features with the Pro Subscription.
        </p>
      </div>
      {renderPricing}
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-slate-700 sm:leading-7">
          {uiConstants.brandName} is a demo app.{" "}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  )
}