import { brandName, uiConstants } from "@/shared/constants/global-constants"
import SectionPanel from "../(components)/sectionpanel"
import { InfoIcon } from "lucide-react"

export default function Page() {
  return (
    <SectionPanel
      icon={<InfoIcon className="scale-75" />}
      title={`${brandName} Ecosystem Version`}
      content="17.2"
    />
  )
}
