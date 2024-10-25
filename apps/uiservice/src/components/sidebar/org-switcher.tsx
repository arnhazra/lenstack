"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { ChevronsUpDown, Orbit } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import ky from "ky"
import { endPoints } from "@/constants/api-endpoints"
import { toast } from "../ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { FETCH_TIMEOUT } from "@/lib/fetch-timeout"
import { generateUUID } from "@/lib/uuid-gen"

export function OrgSwitcher() {
	const [{ user, organizations }, dispatch] = useContext(GlobalContext)

	const switchOrg = async (orgId: string) => {
		try {
			await ky.patch(`${endPoints.updateAttribute}/selectedOrgId/${orgId}`, {
				timeout: FETCH_TIMEOUT,
			})
			dispatch("setRefreshId", generateUUID())
			toast({
				title: uiConstants.notification,
				description: (
					<p className="text-zinc-600">{uiConstants.organizationSwitched}</p>
				),
			})
		} catch (error) {
			toast({
				title: uiConstants.notification,
				description: <p className="text-zinc-600">{uiConstants.toastError}</p>,
			})
		}
	}

	return (
		<Select
			defaultValue={user.selectedOrgId}
			onValueChange={(value: string) => switchOrg(value)}
		>
			<SelectTrigger
				className="shadow-sm org-switcher pl-4 sm:w-[200px] md:w-[200px] lg:w-[250px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
				aria-label="Select org"
			>
				<SelectValue placeholder="Select an org">
					<Orbit />
					<span className="ml-2">
						{organizations.find((org) => org._id === user.selectedOrgId)?.name}
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
		</Select>
	)
}
