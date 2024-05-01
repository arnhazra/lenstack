"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ClipboardIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { Badge } from "../ui/badge"
import Suspense from "../suspense"
import "react-json-view-lite/dist/index.css"

interface SnippetPanelProps {
  title: string
  method: HTTPMethods,
  url: string
  request: Object,
  response: Object
}

export default function SnippetPanel({ title, url, method, request, response }: SnippetPanelProps) {
  const { toast } = useToast()

  const copyValue = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Notification",
      description: <p className="text-neutral-600">{uiConstants.copiedToClipBoard}</p>,
      action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Badge variant="outline">{method}</Badge>
        <Input value={url} disabled />
        <Button variant="outline" size="icon" onClick={copyValue}><ClipboardIcon className="scale-50" /></Button>
      </CardContent>
      <CardFooter className="block">
        <Suspense condition={!!request} fallback={null}>
          <p className="mb-3">Sample Request</p>
          <JsonView data={request ?? {}} shouldExpandNode={allExpanded} style={defaultStyles} />
        </Suspense>
        <Suspense condition={!!response} fallback={null}>
          <p className="mt-3 mb-3">Sample Response</p>
          <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
        </Suspense>
      </CardFooter>
    </Card>
  )
}
