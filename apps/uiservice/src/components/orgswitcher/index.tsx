"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { ChevronsUpDown, Orbit } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { endPoints } from "@/constants/api-endpoints"
import { toast } from "../ui/use-toast"
import { uiConstants } from "@/constants/global-constants"

export function OrgSwitcher() {
  const [{ userState, organizations }, dispatch] = useContext(GlobalContext)

  const switchOrg = async (orgId: string) => {
    try {
      await axios.patch(`${endPoints.updateAttribute}/selectedOrgId/${orgId}`)
      dispatch("setUserState", { refreshId: Math.random().toString() })
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.organizationSwitched}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastError}</p>
      })
    }
  }

  return (
    <Select defaultValue={userState.selectedOrgId} onValueChange={(value: string) => switchOrg(value)}>
      <SelectTrigger
        className="shadow-sm org-switcher pl-4 sm:w-[200px] md:w-[200px] lg:w-[250px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        aria-label="Select org"
      >
        <SelectValue placeholder="Select an org">
          <Orbit />
          <span className="ml-2">
            {organizations.find((org) => org._id === userState.selectedOrgId)?.name}
          </span>
        </SelectValue>
        <ChevronsUpDown />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org._id} value={org._id}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <Orbit />
              {org.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select >
  )
}