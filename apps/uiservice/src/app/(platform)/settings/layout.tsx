"use client"
import { ReactElement, ReactNode, useContext } from "react"
import { uiConstants } from "@/shared/constants/global-constants"
import { Button } from "@/shared/components/ui/button"
import {
  CalendarClock,
  Info,
  Leaf,
  PlusCircle,
  ShieldCheck,
  User,
  Workflow,
} from "lucide-react"
import { GlobalContext } from "@/context/globalstate.provider"
import { usePromptContext } from "@/shared/providers/prompt.provider"
import ky from "ky"
import { endPoints } from "@/shared/constants/api-endpoints"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { toast } from "@/shared/components/ui/use-toast"
import { generateUUID } from "@/shared/lib/uuid-gen"
import { Tabs, tabsList } from "./data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Show from "@/shared/components/show"

const mapTabIcons: Record<Tabs, ReactElement> = {
  user: <User />,
  privacy: <ShieldCheck />,
  workspace: <Workflow />,
  subscription: <CalendarClock />,
  sustainability: <Leaf />,
  about: <Info />,
}

export default function SetingsLayout({ children }: { children: ReactNode }) {
  const [{ user }, dispatch] = useContext(GlobalContext)
  const { prompt } = usePromptContext()
  const pathname = usePathname()

  const createWorkspace = async () => {
    const { hasConfirmed, value } = await prompt("Create New Workspace")

    if (hasConfirmed && value) {
      try {
        await ky.post(endPoints.workspace, {
          json: { name: value },
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateUUID())
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-slate-600">{uiConstants.workspaceCreated}</p>
          ),
        })
      } catch (error) {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-slate-600">{uiConstants.toastError}</p>
          ),
        })
      }
    }
  }

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <Link
        key={tab}
        className={`cursor-pointer flex capitalize ${
          pathname.includes(tab) ? "" : "text-slate-500"
        }`}
        href={`/settings/${tab}`}
      >
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </Link>
    )
  })

  return (
    <>
      <div className="mx-auto grid w-full gap-2">
        <div className="flex justify-between">
          <div className="flex gap-4 mb-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="scale-75" />
            </Button>
            <div>
              <p className="text-sm  font-semibold">{user.name}</p>
              <p className="text-sm text-slate-600 font-semibold">
                {user.email}
              </p>
            </div>
          </div>
          <Show condition={pathname.includes("workspace")}>
            <Button
              size="icon"
              className="rounded-full"
              onClick={createWorkspace}
              title="Create Workspace"
            >
              <PlusCircle className="scale-65" />
            </Button>
          </Show>
        </div>
      </div>
      <div className="mx-auto grid w-full items-start gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm">{renderTabs}</nav>
        <div>{children}</div>
      </div>
    </>
  )
}
