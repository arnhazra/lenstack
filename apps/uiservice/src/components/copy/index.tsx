"use client"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { Clipboard } from "lucide-react"

export default function CopyToClipboard({ value }: { value: string }) {
  const copyValue = () => {
    navigator.clipboard.writeText(value)
    toast({
      title: uiConstants.notification,
      description: <p className="text-slate-600">{uiConstants.copiedToClipBoard}</p>
    })
  }

  return (
    <Button className="rounded-full" variant="default" size="icon" onClick={copyValue} title="Copy to Clipboard"><Clipboard className="scale-50" /></Button>
  )
}
