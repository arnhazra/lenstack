"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CopyIcon } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { uiConstants } from "@/constants/global-constants"

interface InfoPanelProps {
  title: string
  desc: string
  value: string
  masked?: boolean
}

export default function InfoPanel({ title, desc, value, masked }: InfoPanelProps) {
  const { toast } = useToast()

  const copyValue = () => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Notification",
      description: <p className="text-neutral-600">{uiConstants.copiedToClipBoard}</p>,
      action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
    })
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Input value={masked ? `${value?.substring(0, 3)}...${value?.substring(value?.length - 3)}` : value} disabled />
        <Button variant="outline" size="icon" onClick={copyValue}><CopyIcon className="scale-75" /></Button>
      </CardContent>
    </Card>
  )
}
