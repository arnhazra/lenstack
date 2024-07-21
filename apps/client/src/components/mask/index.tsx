"use client"
import { CopyIcon } from "lucide-react"
import { toast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { uiConstants } from "@/constants/global-constants"

export default function MaskText({ value }: { value: string }) {
  const copyValue = () => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Notification",
      description: <p className="text-neutral-600">{uiConstants.copiedToClipBoard}</p>,
      action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
    })
  }

  return (
    <div className="flex">
      {`(${value?.substring(0, 4)}...${value?.substring(value?.length - 4)})`}
      <CopyIcon className="scale-75 ms-2" onClick={copyValue} />
    </div>
  )
}
