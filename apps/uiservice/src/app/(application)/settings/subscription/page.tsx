"use client"
import SectionPanel from "@/app/(application)/settings/(components)/sectionpanel"
import Suspense from "@/shared/components/suspense"
import { Button } from "@/shared/components/ui/button"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/shared/hooks/use-query"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { Subscription } from "@/shared/types"
import { format } from "date-fns"
import ky from "ky"
import { Bolt, CalendarClock, CheckCircle2, Coins } from "lucide-react"
import { useContext, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
  const [{ user, subscription }] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const subscriptionSuccess = searchParams.get("subscriptionSuccess")
    if (subscriptionSuccess !== null) {
      if (subscriptionSuccess === "true") {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">Subscription Activation Success</p>
          ),
        })
        router.push("/settings/subscription")
      }

      if (subscriptionSuccess === "false") {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">Subscription Activation Failure</p>
          ),
        })
        router.push("/settings/subscription")
      }
    }
  }, [searchParams])
  const pricing = useQuery(
    ["pricing"],
    endPoints.getSubscriptionPricing,
    HTTPMethods.GET
  )

  const isSubscriptionActive =
    subscription &&
    subscription.xp > 0 &&
    new Date(subscription.endsAt) > new Date()

  const canActivateNewSubscription =
    !subscription ||
    (subscription &&
      (subscription.xp < 2 ||
        new Date(subscription.endsAt).getTime() - new Date().getTime() <=
          24 * 60 * 60 * 1000))

  const renderPricingTiers = pricing?.data?.map((tier: Subscription) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-white p-2"
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
          <Button
            disabled={
              tier.subscriptionTier === "trial" && user.hasTrial === false
            }
            className="mt-4"
            onClick={() => activateSubscription(tier.subscriptionTier)}
          >
            Activate
          </Button>
        </div>
      </div>
    )
  })

  const activateSubscription = async (tier: string) => {
    try {
      const response: any = await ky
        .post(endPoints.createCheckoutSession, {
          json: { tier },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      window.location = response.redirectUrl
    } catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>,
      })
    }
  }

  return (
    <>
      <Suspense condition={!subscription}>
        <SectionPanel
          icon={<CalendarClock className="scale-75" />}
          title="Your Subscription"
          content="You do not have an active subscription"
        />
      </Suspense>
      <Suspense condition={!!subscription}>
        <section className="grid gap-2">
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Your Subscription Tier"
            content={subscription?.subscriptionTier.toUpperCase() ?? ""}
          />
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Subscription Status"
            content={isSubscriptionActive ? "Active" : "Inactive"}
          />
          <SectionPanel
            icon={<CalendarClock className="scale-75" />}
            title="Subscription Start Date"
            content={format(
              subscription?.createdAt
                ? new Date(subscription.createdAt)
                : new Date(),
              "MMM, do yyyy, h:mm a"
            )}
          />
          <SectionPanel
            icon={<CalendarClock className="scale-75" />}
            title="Subscription Valid Upto"
            content={format(
              subscription?.endsAt ? new Date(subscription.endsAt) : new Date(),
              "MMM, do yyyy, h:mm a"
            )}
          />
          <SectionPanel
            icon={<Coins className="scale-75" />}
            title="Remaining XP"
            content={subscription?.xp.toFixed(2).toString() ?? "0"}
          />
        </section>
      </Suspense>
      <Suspense condition={!!canActivateNewSubscription}>
        <div className="mx-auto mt-4 grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {renderPricingTiers}
        </div>
      </Suspense>
    </>
  )
}
