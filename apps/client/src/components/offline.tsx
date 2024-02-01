import { uiConstants } from "@/constants/global-constants"
import { ShuffleIcon } from "@radix-ui/react-icons"
import React from "react"

export default function Offline() {
  return (
    <div className="box">
      <p className="branding mb-4">{uiConstants.noNetworkMessage}</p>
      <div className="text-center mb-4">
        <ShuffleIcon className="icon-large" />
      </div>
    </div>
  )
}
