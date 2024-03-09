"use client"
import { uiConstants } from "@/constants/global-constants"
import { CrossCircledIcon } from "@radix-ui/react-icons"

export default function Error() {
  return (
    <div className="container-center">
      <div className="box">
        <p className="branding mb-4">{uiConstants.errorMessage}</p>
        <div className="text-center mb-4">
          <CrossCircledIcon className="icon-large" />
        </div>
      </div>
    </div>
  )
}
