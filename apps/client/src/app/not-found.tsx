import { uiConstants } from "@/constants/global-constants"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <Fragment>
      <div className="container-center">
        <div className="box">
          <p className="branding mb-4">{uiConstants.errorMessage}</p>
          <div className="text-center mb-4">
            <CrossCircledIcon className="icon-large" />
          </div>
          <Link className="btn btn-primary btn-block" href={"/products"}><ArrowLeftIcon className="icon-left" />Go Back</Link>
        </div>
      </div>
    </Fragment>
  )
}
