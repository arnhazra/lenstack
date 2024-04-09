"use client"
import { uiConstants } from "@/constants/global-constants"
import { CircleX } from "lucide-react"

export default function Error() {
  return (
    <div className="container-center">
      <div className="box">
        <p className="branding mb-4">{uiConstants.errorMessage}</p>
        <div className="text-center mb-4">
          <CircleX className="icon-large" />
        </div>
      </div>
    </div>
  )
}
