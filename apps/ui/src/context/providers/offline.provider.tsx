"use client"
import Offline from "@/components/offline"
import Suspense from "@/components/suspense"
import { useNetworkState } from "@uidotdev/usehooks"
import { ReactNode } from "react"

export default function OfflineProvider({ children }: { children: ReactNode }) {
  const network = useNetworkState()

  return (
    <Suspense condition={network.online} fallback={<Offline />}>
      {children}
    </Suspense>
  )
}
