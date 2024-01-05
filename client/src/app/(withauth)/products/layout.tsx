"use client"
import Suspense from "@/components/suspense"
import SubscriptionWall from "@/components/subscription-wall"
import { GlobalContext } from "@/context/globalstate.provider"
import { usePathname } from "next/navigation"
import { ReactNode, useContext } from "react"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)
  const pathname = usePathname()
  const urlParts = pathname.split("/")
  const productsIndex = urlParts.indexOf("products")
  let productName = ""
  if (productsIndex !== -1 && productsIndex + 1 < urlParts.length) {
    productName = urlParts[productsIndex + 1]
  }

  return (
    <Suspense condition={userState.hasActiveSubscription} fallback={<SubscriptionWall />}>
      {children}
    </Suspense>
  )
}
