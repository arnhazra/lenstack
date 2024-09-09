"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Recycle, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import Suspense from "@/components/suspense"
import SectionPanel from "@/components/sectionpanel"
import CopyToClipboard from "@/components/copy"

interface OrgPanelProps {
  orgId: string,
  isSelected: boolean,
  displayName: string,
  createdAt: string,
  clientId: string,
  clientSecret: string,
  onRegenCred: (orgId: string) => void,
  onDelete: (orgId: string) => void,
}

export default function OrgPanel({ orgId, isSelected, displayName, createdAt, clientId, clientSecret, onRegenCred, onDelete }: OrgPanelProps) {
  const { toast } = useToast()

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value)
    toast({
      title: uiConstants.notification,
      description: <p className="text-slate-600">{uiConstants.copiedToClipBoard}</p>
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md flex gap-2">
          {displayName}
          <Suspense condition={isSelected} fallback={null}>
            <CheckCircle2 className="scale-75" />
          </Suspense>
        </CardTitle>
        <CardDescription className="text-sm">{format(new Date(createdAt), "MMM, do yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <SectionPanel
          title="Client Id"
          content={clientId}
          masked
          actionComponent={<CopyToClipboard value={clientId} />} icon={undefined}
        />
        <SectionPanel
          title="Client Secret"
          content={clientSecret}
          masked
          actionComponent={<CopyToClipboard value={clientSecret} />} icon={undefined}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="default" size="icon" className="rounded-full" onClick={() => onRegenCred(orgId)}><Recycle className="scale-75" /></Button>
        <Button variant="destructive" size="icon" className="rounded-full" disabled={isSelected} onClick={() => onDelete(orgId)}><Trash className="scale-75" /></Button>
      </CardFooter>
    </Card >
  )
}
