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
import { CheckCircle2, Lock, Recycle, Trash } from "lucide-react"
import { format } from "date-fns"
import Suspense from "@/shared/components/suspense"
import SectionPanel from "./sectionpanel"
import CopyToClipboard from "@/shared/components/copy"

interface WorkspacePanelProps {
  workspaceId: string
  isSelected: boolean
  displayName: string
  createdAt: string
  accessKey: string
  onRegenCred: (workspaceId: string) => void
  onDelete: (workspaceId: string) => void
}

export default function WorkspacePanel({
  workspaceId,
  isSelected,
  displayName,
  createdAt,
  accessKey,
  onRegenCred,
  onDelete,
}: WorkspacePanelProps) {
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
          onClick={() => onRegenCred(workspaceId)}
        >
          <Recycle className="scale-75" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          disabled={isSelected}
          onClick={() => onDelete(workspaceId)}
        >
          <Trash className="scale-75" />
        </Button>
      </CardFooter>
    </Card>
  )
}
