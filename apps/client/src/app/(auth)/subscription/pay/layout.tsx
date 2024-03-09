"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function PayLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)

  return (
    <Suspense condition={userState.hasActiveSubscription} fallback={children}>
      <div className="container-center">
        <div className="box">
          <p className="branding">Hold On</p>
          <p className="text-muted">Seems like you are already having an active subscription</p>
          <Link className="btn btn-primary btn-block" href="/products">Go to Products Page<ArrowRightIcon className="icon-right" /></Link>
        </div>
      </div>
    </Suspense>
  )
}
