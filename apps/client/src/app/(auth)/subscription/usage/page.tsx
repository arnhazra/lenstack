"use client"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import Loading from "@/components/loading"
import { format } from "date-fns"
import { CalendarIcon, CubeIcon, PieChartIcon } from "@radix-ui/react-icons"
import InfoPanel from "@/components/infopanel/infopanel"
import Error from "@/components/error"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error} fallback={<Error />}>
        <div className="box">
          <p className="branding">Platform Usage</p>
          <p className="muted-text mb-4">Subscribe & Track your API Credentials usage from here</p>
          <InfoPanel infoIcon={<CubeIcon />} infoName="Selected Plan" infoValue={userState.hasActiveSubscription ? userState.selectedPlan.charAt(0).toUpperCase() + userState.selectedPlan.slice(1) : "No Active Subscription"} />
          <InfoPanel infoIcon={<CalendarIcon />} infoName="Start Date" infoValue={userState.hasActiveSubscription ? format(new Date(userState.createdAt), "MMM, do yyyy") : "No Validity Data"} />
          <InfoPanel infoIcon={<CalendarIcon />} infoName="Valid Upto" infoValue={userState.hasActiveSubscription ? format(new Date(userState.expiresAt), "MMM, do yyyy") : "No Validity Data"} />
          <InfoPanel infoIcon={<PieChartIcon />} infoName="Subscription Usage" infoValue={userState.hasActiveSubscription ? `${userState.remainingCredits} / ${currentPlan?.grantedCredits} Credits remaining` : "No Subscriptions Usage Data"} />
        </div>
      </Suspense>
    </Suspense>
  )
}