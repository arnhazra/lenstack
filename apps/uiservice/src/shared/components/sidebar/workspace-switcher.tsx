"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { ChevronsUpDown, Orbit } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import ky from "ky"
import { endPoints } from "@/shared/constants/api-endpoints"
import { toast } from "@/shared/components/ui/use-toast"
import { uiConstants } from "@/shared/constants/global-constants"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateUUID } from "@/shared/lib/uuid-gen"

export function WorkspaceSwitcher() {
  const [{ user, workspaces }, dispatch] = useContext(GlobalContext)

  const switchWorkspace = async (workspaceId: string) => {
    try {
      await ky.patch(
        `${endPoints.updateAttribute}/selectedWorkspaceId/${workspaceId}`,
        {
          timeout: FETCH_TIMEOUT,
        }
      )
      dispatch("setRefreshId", generateUUID())
      toast({
        title: uiConstants.notification,
        description: (
          <p className="text-slate-600">{uiConstants.workspaceSwitched}</p>
        ),
      })
    } catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastError}</p>,
      })
    }
  }

  return (
    <Select
      defaultValue={user.selectedWorkspaceId}
      onValueChange={(value: string) => switchWorkspace(value)}
    >
      <SelectTrigger
        className="shadow-sm workspace-switcher pl-4 sm:w-[200px] md:w-[200px] lg:w-[250px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        aria-label="Select workspace"
      >
        <SelectValue placeholder="Select an workspace">
          <Orbit />
          <span className="ml-2">
            {
              workspaces.find(
                (workspace) => workspace._id === user.selectedWorkspaceId
              )?.name
            }
          </span>
        </SelectValue>
        <ChevronsUpDown />
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace._id} value={workspace._id}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <Orbit />
              {workspace.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
