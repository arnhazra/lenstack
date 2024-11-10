"use client"
import OrgPanel from "@/app/(application)/settings/(components)/orgpanel"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateUUID } from "@/shared/lib/uuid-gen"
import { useConfirmContext } from "@/shared/providers/confirm.provider"
import ky from "ky"
import { useContext } from "react"
import { Organization } from "@/shared/types"

export default function Page() {
  const [{ user, organizations }, dispatch] = useContext(GlobalContext)
  const { confirm } = useConfirmContext()

  const regenerateCreds = async (orgId: string) => {
    const response = await confirm(
      "Are you sure to regenerate credentials for this org ?"
    )
    if (response) {
      try {
        await ky.patch(`${endPoints.organization}/${orgId}`, {
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

  const deleteOrg = async (orgId: string) => {
    const response = await confirm("Are you sure to delete this org ?")
    if (response) {
      try {
        await ky.delete(`${endPoints.organization}/${orgId}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateUUID())
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">{uiConstants.organizationDeleted}</p>
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

  const renderOrgs = organizations?.map((organization: Organization) => {
    return (
      <OrgPanel
        key={organization?._id}
        orgId={organization?._id}
        isSelected={organization._id === user.selectedOrgId}
        displayName={organization?.name}
        accessKey={organization?.accessKey}
        createdAt={organization?.createdAt}
        onRegenCred={(orgId) => regenerateCreds(orgId)}
        onDelete={(orgId) => deleteOrg(orgId)}
      />
    )
  })

  return <section className="grid gap-2">{renderOrgs}</section>
}
