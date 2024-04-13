"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)

  return (
    <Suspense condition={!userState.hasActiveSubscription} fallback={children}>
      <div className="container-center">
        <div className="box">
          <p className="branding">Hold On</p>
          <p className="text-muted">Seems like you are not having an active subscription to use/view this Product</p>
          <Link className="btn btn-primary btn-block" href={"/subscription/plans"}>Subscribe<ArrowRightIcon className="icon-right" /></Link>
        </div>
      </div>
    </Suspense>
  )
}
