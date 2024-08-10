"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clipboard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { Badge } from "../ui/badge"
import Suspense from "../suspense"
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

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
      description: <p className="text-stone-600">{uiConstants.copiedToClipBoard}</p>
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
        <Button variant="outline" size="icon" onClick={copyValue}><Clipboard className="scale-50" /></Button>
      </CardContent>
      <CardFooter className="block">
        <Suspense condition={!!request} fallback={null}>
          <p className="mb-3">Sample Request</p>
          <SyntaxHighlighter language="json" style={stackoverflowLight} customStyle={{ maxHeight: "15rem" }}>
            {JSON.stringify(request, null, 2)}
          </SyntaxHighlighter>
        </Suspense>
        <Suspense condition={!!response} fallback={null}>
          <p className="mt-3 mb-3">Sample Response</p>
          <SyntaxHighlighter wrapLongLines language="json" style={stackoverflowLight} customStyle={{ maxHeight: "15rem" }}>
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        </Suspense>
      </CardFooter>
    </Card>
  )
}
