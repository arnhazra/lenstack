"use client"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import { Container, Row } from "react-bootstrap"
import { GenericAppCardInterface } from "@/types/Types"
import GenericAppCard from "@/components/GenericAppCard"
import { AppContext } from "@/context/appStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(AppContext)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const displayApps = useCallback(() => {
    const appsToDisplay = apps?.data?.filter((app: any) =>
      app.appName.toLowerCase().includes(globalSearchString)
    )?.map((app: any) => {
      const genericAppCardProps: GenericAppCardInterface = {
        badgeText: app.appStatus,
        className: app.appCategory,
        footerText: app.description,
        headerText: `${app.appName}`,
        redirectUri: `/apps/?appName=${app.appName}`
      }

      return <GenericAppCard key={app.appName} genericAppCardProps={genericAppCardProps} />
    })

    return (
      <Row className="mb-4">
        {appsToDisplay}
      </Row>
    )
  }, [globalSearchString, apps?.data])

  return (
    <Fragment>
      <Show when={!apps.isLoading}>
        <Container>
          <h4 className="text-white">Lenstack Services</h4>
          {displayApps()}
        </Container>
      </Show>
      <Show when={apps.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}