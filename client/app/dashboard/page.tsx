"use client"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { Fragment, useContext, useState } from "react"
import Show from "@/_components/Show"
import Loading from "@/_components/Loading"
import { Button, Container, Row } from "react-bootstrap"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import { toast } from "sonner"
import Constants from "@/_constants/appConstants"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { GenericAppCardInterface } from "@/_types/Types"
import GenericAppCard from "@/_components/GenericAppCard"

export default function Page() {
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const [{ userState }] = useContext(AppContext)
  const [displayTrialButton, setDisplayTrialButton] = useState(userState.trialAvailable)

  const appsToDisplay = apps?.data?.map((app: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: app.appStatus,
      className: app.appName,
      footerText: app.description,
      headerText: app.appName,
      redirectUri: `/apps/?appName=${app.appName}`
    }

    return <GenericAppCard key={app.appName} genericAppCardProps={genericAppCardProps} />
  })

  const activateTrial = async () => {
    try {
      await axios.post(endPoints.activateTrialEndpoint)
      setDisplayTrialButton(false)
      toast.success(Constants.ToastSuccess)
    }

    catch (error) {
      toast.error(Constants.ToastError)
    }
  }

  return (
    <Fragment>
      <Show when={!apps.isLoading}>
        <Container>
          <h4 className="dashboard-header">Welcome to Lenstack!</h4>
          <Show when={displayTrialButton}>
            <Button onClick={activateTrial}>Activate Trial<ArrowRightIcon className="icon-right" /></Button>
          </Show>
          <Row className="mb-4">
            {appsToDisplay}
          </Row>
        </Container>
      </Show>
      <Show when={apps.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
