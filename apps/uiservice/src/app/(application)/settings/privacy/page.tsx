"use client"
import CopyToClipboard from "@/shared/components/copy"
import SectionPanel from "@/app/(application)/settings/(components)/sectionpanel"
import { Switch } from "@/shared/components/ui/switch"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import ky from "ky"
import { PieChart, Fingerprint, ScanFace } from "lucide-react"
import { useContext } from "react"

export default function Page() {
  const [{ user }, dispatch] = useContext(GlobalContext)

  const saveActivityLogSettings = async (updatedSettings: boolean) => {
    try {
      dispatch("setUser", { activityLog: updatedSettings })
      await ky.patch(
        `${endPoints.updateAttribute}/activityLog/${updatedSettings}`,
        { timeout: FETCH_TIMEOUT }
      )
    } catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>,
      })
    }
  }

  return (
    <section className="grid gap-2">
      <SectionPanel
        icon={<PieChart className="scale-75" />}
        title="Activity Log"
        content="Choose whether to save the things you do to get more relevant results"
        actionComponent={
          <Switch
            checked={user.activityLog}
            onCheckedChange={(value): Promise<void> =>
              saveActivityLogSettings(value)
            }
          />
        }
      />
      <SectionPanel
        icon={<Fingerprint className="scale-75" />}
        title="Access Token"
        content={localStorage.getItem("accessToken") ?? ""}
        masked
        actionComponent={
          <CopyToClipboard value={localStorage.getItem("accessToken") ?? ""} />
        }
      />
      <SectionPanel
        icon={<ScanFace className="scale-75" />}
        title="Refresh Token"
        content={localStorage.getItem("refreshToken") ?? ""}
        masked
        actionComponent={
          <CopyToClipboard value={localStorage.getItem("refreshToken") ?? ""} />
        }
      />
    </section>
  )
}
