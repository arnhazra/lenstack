"use client"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import Hero from "@/components/hero"
import CenterGrid from "@/components/centergrid"
import { uiConstants } from "@/constants/global-constants"
import Option from "@/components/option"
import { Button, Col, Row } from "react-bootstrap"
import axios from "axios"
import toast from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)

  const saveSettings = async () => {
    try {
      const { useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls } = userState
      await axios.patch(endPoints.sustainabilityUpdateSettings, { useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls })
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
        <Row>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <Option
              key="useDarkMode"
              isSelected={userState.useDarkMode}
              value="useDarkMode"
              label="Use Dark Mode"
              handleChange={(): void => dispatch("setUserState", { useDarkMode: !userState.useDarkMode })}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <Option
              key="useFastestNode"
              isSelected={userState.useFastestNode}
              value="useFastestNode"
              label="Use Fastest Node"
              handleChange={(): void => dispatch("setUserState", { useFastestNode: !userState.useFastestNode })}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <Option
              key="useLessEnergy"
              isSelected={userState.useLessEnergy}
              value="useLessEnergy"
              label="Use Less Energy"
              handleChange={(): void => dispatch("setUserState", { useLessEnergy: !userState.useLessEnergy })}
            />
          </Col>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <Option
              key="useOptimizedAPICalls"
              isSelected={userState.useOptimizedAPICalls}
              value="useOptimizedAPICalls"
              label="Optimized API Calls"
              handleChange={(): void => dispatch("setUserState", { useOptimizedAPICalls: !userState.useOptimizedAPICalls })}
            />
          </Col>
        </Row>
        <Button variant="primary" className="btn-block" onClick={saveSettings}>Save Settings<CheckCircledIcon className="icon-right" /></Button>
      </Hero>
    </CenterGrid>
  )
}
