"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext } from "react"
import PayWall from "./pay-wall"

export default function PayLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)

  return (
    <Suspense condition={!userState.hasActiveSubscription} fallback={<PayWall />}>
      {children}
    </Suspense>
  )
}
