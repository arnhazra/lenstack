"use client"
import CopyToClipboard from "@/components/copy"
import SectionPanel from "@/components/sectionpanel"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { endPoints } from "@/constants/api-endpoints"
import { brandName, uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/lib/fetch-timeout"
import ky from "ky"
import { User, IdCard, AtSign, CircleArrowRight } from "lucide-react"
import { useContext } from "react"

export default function Page() {
  const [{ user }] = useContext(GlobalContext)

  const signOut = async (signOutOption: string) => {
    try {
      if (signOutOption === "all") {
        await ky.post(endPoints.signOut, { timeout: FETCH_TIMEOUT })
      }
      localStorage.clear()
      window.location.replace("/")
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
        icon={<User className="scale-75" />}
        title="Your Name"
        content={user.name}
      />
      <SectionPanel
        icon={<IdCard className="scale-75" />}
        title={`${brandName} ID`}
        content={user._id}
        masked
        actionComponent={<CopyToClipboard value={user._id} />}
      />
      <SectionPanel
        icon={<AtSign className="scale-75" />}
        title="Your Email"
        content={user.email}
        actionComponent={<CopyToClipboard value={user.email} />}
      />
      <SectionPanel
        icon={<CircleArrowRight className="scale-75" />}
        title="Sign Out"
        content="Sign out from all logged in devices"
        actionComponent={
          <Button
            size="icon"
            className="rounded-full"
            variant="destructive"
            onClick={(): Promise<void> => signOut("all")}
          >
            <CircleArrowRight className="scale-75" />
          </Button>
        }
      />
    </section>
  )
}
