import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function PayWall() {
  return (
    <div className="box">
      <p className="branding">Hold On</p>
      <p className="muted-text">Seems like you are already having an active subscription in this workspace</p>
      <Link className="btn btn-primary btn-block" href="/dashboard">Go to Dashboard<ArrowRightIcon className="icon-right" /></Link>
      <Link className="btn btn-secondary btn-block" href="/workspace"><CubeIcon className="icon-left" />Switch Workspace</Link>
    </div>
  )
}
