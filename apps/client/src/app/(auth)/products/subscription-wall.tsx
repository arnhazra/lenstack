import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function SubscriptionWall() {
  return (
    <div className="box">
      <p className="branding">Hold On</p>
      <p className="muted-text">Seems like you are not having an active subscription to use/view this Product</p>
      <Link className="btn btn-primary btn-block" href={"/subscription/plans"}>Subscribe<ArrowRightIcon className="icon-right" /></Link>
    </div>
  )
}
