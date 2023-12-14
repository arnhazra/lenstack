"use client"
import Show from "@/components/show-component"
import SubHeader from "@/components/sub-header-component"
import { GlobalContext } from "@/context/globalstate.provider"
import { BookmarkIcon, CubeIcon, HomeIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, ReactNode, useContext } from "react"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)
  const pathname = usePathname()
  const router = useRouter()
  const urlParts = pathname.split("/")
  const productsIndex = urlParts.indexOf('products')
  let productName = ""
  if (productsIndex !== -1 && productsIndex + 1 < urlParts.length) {
    productName = urlParts[productsIndex + 1]
  }

  return (
    <Fragment>
      <Show when={userState.hasActiveSubscription}>
        <SubHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-white">Lenstack {productName}</h4>
            <div className="ml-auto">
              <HomeIcon className="icon-subheader" onClick={() => router.push(`/products/${productName}`)} />
            </div>
          </div>
        </SubHeader>
        {children}
      </Show>
      <Show when={!userState.hasActiveSubscription}>
        <div className="box">
          <p className="branding">Hold On</p>
          <p className="muted-text">Seems like you are not having an active subscription in this workspace to use/view this Product</p>
          <Link className="btn btn-primary btn-block" href={"/subscription"}><BookmarkIcon className="icon-left" />Manage Subscription</Link>
          <Link className="btn btn-secondary btn-block" href={"/workspace"}><CubeIcon className="icon-left" />Switch Workspace</Link>
        </div>
      </Show>
    </Fragment>
  )
}
