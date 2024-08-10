"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clipboard, RefreshCcw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import Suspense from "@/components/suspense"

interface OrgPanelProps {
  orgId: string,
  isSelected: boolean,
  displayName: string,
  createdAt: string,
  clientId: string,
  clientSecret: string,
  onRegenCred: (orgId: string) => void,
  onSwitch: (orgId: string) => void,
  onDelete: (orgId: string) => void,
}

export default function OrgPanel({ orgId, isSelected, displayName, createdAt, clientId, clientSecret, onRegenCred, onSwitch, onDelete }: OrgPanelProps) {
  const { toast } = useToast()

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value)
    toast({
      title: "Notification",
      description: <p className="text-stone-600">{uiConstants.copiedToClipBoard}</p>
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          {displayName}
          <Suspense condition={isSelected} fallback={null}>
            <CheckCircle2 />
          </Suspense>
        </CardTitle>
        <CardDescription>{format(new Date(createdAt), "MMM, do yyyy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="clientId" className="ms-1">Client Id</Label>
        <div className="flex gap-3 mb-4">
          <Input value={clientId} disabled />
          <Button variant="outline" size="icon" onClick={() => copyValue(clientId)}><Clipboard className="scale-50" /></Button>
        </div>
        <Label htmlFor="clientSecret" className="ms-1">Client Secret</Label>
        <div className="flex gap-3">
          <Input value={`(${clientSecret?.substring(0, 4)}...${clientSecret?.substring(clientSecret?.length - 4)})`} disabled />
          <Button variant="outline" size="icon" onClick={() => copyValue(clientSecret)}><Clipboard className="scale-50" /></Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {/* <Button variant="secondary" onClick={() => onRegenCred(orgId)}><RefreshCcw className="scale-75" /></Button> */}
        <Button variant="default" disabled={isSelected} onClick={() => onSwitch(orgId)}>Switch</Button>
        <Button variant="destructive" disabled={isSelected} onClick={() => onDelete(orgId)}>Delete Org</Button>
      </CardFooter>
    </Card>
  )
}
