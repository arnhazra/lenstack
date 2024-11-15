"use client"
import WorkspacePanel from "@/app/(application)/settings/(components)/workspacepanel"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateUUID } from "@/shared/lib/uuid-gen"
import { useConfirmContext } from "@/shared/providers/confirm.provider"
import ky from "ky"
import { useContext } from "react"
import { Workspace } from "@/shared/types"

export default function Page() {
  const [{ user, workspaces }, dispatch] = useContext(GlobalContext)
  const { confirm } = useConfirmContext()

  const regenerateCreds = async (workspaceId: string) => {
    const response = await confirm(
      "Are you sure to regenerate credentials for this workspace ?"
    )
    if (response) {
      try {
        await ky.patch(`${endPoints.workspace}/${workspaceId}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateUUID())
      } catch (error) {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">{uiConstants.toastError}</p>
          ),
        })
      }
    }
  }

  const deleteWorkspace = async (workspaceId: string) => {
    const response = await confirm("Are you sure to delete this workspace ?")
    if (response) {
      try {
        await ky.delete(`${endPoints.workspace}/${workspaceId}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateUUID())
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">{uiConstants.workspaceDeleted}</p>
          ),
        })
      } catch (error) {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">{uiConstants.toastError}</p>
          ),
        })
      }
    }
  }

  const renderWorkspaces = workspaces?.map((workspace: Workspace) => {
    return (
      <WorkspacePanel
        key={workspace?._id}
        workspaceId={workspace?._id}
        isSelected={workspace._id === user.selectedWorkspaceId}
        displayName={workspace?.name}
        accessKey={workspace?.accessKey}
        createdAt={workspace?.createdAt}
        onRegenCred={(workspaceId) => regenerateCreds(workspaceId)}
        onDelete={(workspaceId) => deleteWorkspace(workspaceId)}
      />
    )
  })

  return <section className="grid gap-2">{renderWorkspaces}</section>
}
