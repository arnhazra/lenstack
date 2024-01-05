import { BookmarkIcon, CubeIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function SubscriptionWall() {
  return (
    <div className="box">
      <p className="branding">Hold On</p>
      <p className="muted-text">Seems like you are not having an active subscription in this workspace to use/view this Product</p>
      <Link className="btn btn-primary btn-block" href={"/subscription"}><BookmarkIcon className="icon-left" />Manage Subscription</Link>
      <Link className="btn btn-secondary btn-block" href={"/workspace"}><CubeIcon className="icon-left" />Switch Workspace</Link>
    </div>
  )
}
