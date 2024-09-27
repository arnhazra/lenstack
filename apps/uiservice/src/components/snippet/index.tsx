"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { Input } from "@/components/ui/input"
import HTTPMethods from "@/constants/http-methods"
import { Badge } from "../ui/badge"
import Suspense from "../suspense"
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import CopyToClipboard from "../copy"

interface SnippetPanelProps {
  title: string
  method: HTTPMethods,
  url: string
  request: Object,
  response: Object
}

export default function SnippetPanel({ title, url, method, request, response }: SnippetPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Badge variant="outline">{method}</Badge>
        <Input value={url} disabled />
        <CopyToClipboard value={url} />
      </CardContent>
      <CardFooter className="block">
        <Suspense condition={!!request} fallback={null}>
          <p className="text-sm mb-3">Sample Request</p>
          <SyntaxHighlighter language="json" style={stackoverflowLight} customStyle={{ maxHeight: "15rem" }}>
            {JSON.stringify(request, null, 2)}
          </SyntaxHighlighter>
        </Suspense>
        <Suspense condition={!!response} fallback={null}>
          <p className="text-sm mt-3 mb-3">Sample Response</p>
          <SyntaxHighlighter wrapLongLines language="json" style={stackoverflowLight} customStyle={{ maxHeight: "15rem" }}>
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        </Suspense>
      </CardFooter>
    </Card>
  )
}
