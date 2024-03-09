"use client"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import Hero from "@/components/hero"
import CenterGrid from "@/components/centergrid"
import { uiConstants } from "@/constants/global-constants"
import Option from "@/components/option"
import { Button } from "react-bootstrap"
import axios from "axios"
import toast from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)

  const saveSettings = async () => {
    try {
      const { useEnergySaver, useOptimizedAPICalls } = userState
      await axios.patch(endPoints.sustainabilityUpdateSettings, { useEnergySaver, useOptimizedAPICalls })
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success(uiConstants.toastSuccess)
    }

    catch (error) {
      toast.error(uiConstants.toastError)
    }
  }

  return (
    <CenterGrid>
      <Hero>
        <p className="branding">Sustainability Settings</p>
        <p className="text-muted mt-2 mb-4">
          {uiConstants.brandName} is committed towards a sustainable development by reducing Carbon footprints.
        </p>
        <Option
          key="useEnergySaver"
          isSelected={userState.useEnergySaver}
          value="useEnergySaver"
          label="Use Energy Saver"
          handleChange={(): void => dispatch("setUserState", { useEnergySaver: !userState.useEnergySaver })}
        />
        <Option
          key="useOptimizedAPICalls"
          isSelected={userState.useOptimizedAPICalls}
          value="useOptimizedAPICalls"
          label="Optimized API Calls"
          handleChange={(): void => dispatch("setUserState", { useOptimizedAPICalls: !userState.useOptimizedAPICalls })}
        />
        <Button variant="primary" className="btn-block" onClick={saveSettings}>Save Settings<CheckCircledIcon className="icon-right" /></Button>
      </Hero>
    </CenterGrid>
  )
}
