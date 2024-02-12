"use client"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import Loading from "@/components/loading"
import { format } from "date-fns"
import { ArrowRightIcon, CalendarIcon, CubeIcon, PieChartIcon, StackIcon } from "@radix-ui/react-icons"
import InfoPanel from "@/components/infopanel/infopanel"
import Error from "@/components/error"
import Link from "next/link"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error} fallback={<Error />}>
        <div className="box">
          <p className="branding">Subscribe & Usage</p>
          <p className="muted-text mb-4">Subscribe & Track your API Credentials usage from here</p>
          <InfoPanel infoIcon={<StackIcon />} infoName="Workspace" infoValue={userState.selectedWorkspaceName} />
          <InfoPanel infoIcon={<CubeIcon />} infoName="Selected Plan" infoValue={userState.hasActiveSubscription ? userState.selectedPlan.charAt(0).toUpperCase() + userState.selectedPlan.slice(1) : "No Active Subscription"} />
          <InfoPanel infoIcon={<CalendarIcon />} infoName="Validity" infoValue={userState.hasActiveSubscription ? `Valid upto ${format(new Date(userState.expiresAt), "MMM, do yyyy")}` : "No Validity Data"} />
          <InfoPanel infoIcon={<PieChartIcon />} infoName="Subscription Usage" infoValue={userState.hasActiveSubscription ? `${userState.remainingCredits} / ${currentPlan?.grantedCredits} Credits remaining` : "No Subscriptions Usage Data"} />
          <Link href="/subscription/plans" className="btn btn-primary btn-block">View Plans<ArrowRightIcon className="icon-right" /></Link>
        </div>
      </Suspense>
    </Suspense>
  )
}