"use client"
import SectionPanel from "@/app/(application)/settings/(components)/sectionpanel"
import { Switch } from "@/shared/components/ui/switch"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import ky from "ky"
import { Leaf } from "lucide-react"
import { useContext } from "react"

export default function Page() {
  const [{ user }, dispatch] = useContext(GlobalContext)

  const saveSustainabilitySettings = async (updatedSettings: boolean) => {
    try {
      dispatch("setUser", { reduceCarbonEmissions: updatedSettings })
      await ky.patch(
        `${endPoints.updateAttribute}/reduceCarbonEmissions/${updatedSettings}`,
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
    <SectionPanel
      icon={<Leaf className="scale-75" />}
      title="Reduce Carbon Emissions"
      content={`Turn this settings on to reduce carbon footprints inside ${brandName}`}
      actionComponent={
        <Switch
          checked={user.reduceCarbonEmissions}
          onCheckedChange={(value): Promise<void> =>
            saveSustainabilitySettings(value)
          }
        />
      }
    />
  )
}
