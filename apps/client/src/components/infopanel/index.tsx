"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ClipboardIcon } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { uiConstants } from "@/constants/global-constants"

interface InfoPanelProps {
  title: string
  desc: string
  value: string
  masked?: boolean,
  capitalize?: boolean
}

export default function InfoPanel({ title, desc, value, masked, capitalize }: InfoPanelProps) {
  const { toast } = useToast()

  const copyValue = () => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Notification",
      description: <p className="text-slate-600">{uiConstants.copiedToClipBoard}</p>
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Input className={capitalize ? "capitalize" : ""} value={masked ? `(${value?.substring(0, 4)}...${value?.substring(value?.length - 4)})` : value} disabled />
        <Button variant="outline" size="icon" onClick={copyValue}><ClipboardIcon className="scale-50" /></Button>
      </CardContent>
    </Card>
  )
}
