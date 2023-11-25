"use client"
import Show from "@/components/show.component"
import { BookmarkIcon, CubeIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Fragment, ReactNode } from "react"

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Show when={!!localStorage.getItem("clientId")}>
        {children}
      </Show>
      <Show when={!localStorage.getItem("clientId")}>
        <div className="box">
          <p className="branding">Hold On</p>
          <p className="muted-text">Seems like you are not having an active subscription in this workspace to use/view this Product</p>
          <Link className="btn btn-block" href={"/subscription"}><BookmarkIcon className="icon-left" />Manage Subscription</Link>
          <Link className="btn btn-block" href={"/workspace"}><CubeIcon className="icon-left" />Switch Workspace</Link>
        </div>
      </Show>
    </Fragment>
  )
}
