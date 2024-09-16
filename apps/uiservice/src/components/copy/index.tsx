"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { CheckCircle2, Clipboard } from "lucide-react"
import Suspense from "../suspense"

export default function CopyToClipboard({ value }: { value: string }) {
  const [isCopied, setCopied] = useState(false)

  const copyValue = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Button variant="secondary" size="icon" onClick={copyValue} title="Copy to Clipboard">
      <Suspense condition={!isCopied} fallback={<CheckCircle2 className="scale-65 text-green-500" />}>
        <Clipboard className="scale-65" />
      </Suspense>
    </Button>
  )
}
