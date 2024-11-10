"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { CheckCircle2, Key, Lock, Recycle, Trash } from "lucide-react"
import { format } from "date-fns"
import Suspense from "@/shared/components/suspense"
import SectionPanel from "@/app/(application)/settings/(components)/sectionpanel"
import CopyToClipboard from "@/shared/components/copy"

interface OrgPanelProps {
  orgId: string
  isSelected: boolean
  displayName: string
  createdAt: string
  accessKey: string
  onRegenCred: (orgId: string) => void
  onDelete: (orgId: string) => void
}

export default function OrgPanel({
  orgId,
  isSelected,
  displayName,
  createdAt,
  accessKey,
  onRegenCred,
  onDelete,
}: OrgPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md flex gap-2">
          {displayName}
          <Suspense condition={isSelected}>
            <CheckCircle2 className="scale-75" />
          </Suspense>
        </CardTitle>
        <CardDescription className="text-sm">
          {format(new Date(createdAt), "MMM, do yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <SectionPanel
          icon={<Lock className="scale-75" />}
          title="Access Key"
          content={accessKey}
          masked
          actionComponent={<CopyToClipboard value={accessKey} />}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="default"
          size="icon"
          className="rounded-full"
          onClick={() => onRegenCred(orgId)}
        >
          <Recycle className="scale-75" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          disabled={isSelected}
          onClick={() => onDelete(orgId)}
        >
          <Trash className="scale-75" />
        </Button>
      </CardFooter>
    </Card>
  )
}
