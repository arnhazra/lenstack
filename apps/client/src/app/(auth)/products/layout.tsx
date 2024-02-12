"use client"
import Suspense from "@/components/suspense"
import SubscriptionWall from "./subscription-wall"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext } from "react"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)

  return (
    <Suspense condition={userState.hasActiveSubscription} fallback={<SubscriptionWall />}>
      {children}
    </Suspense>
  )
}
