"use client"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { Fragment } from "react"
import Show from "@/_components/Show"
import Loading from "@/_components/Loading"
import { Container, Row } from "react-bootstrap"
import { GenericAppCardInterface } from "@/_types/Types"
import GenericAppCard from "@/_components/GenericAppCard"

export default function Page() {
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const appsToDisplay = apps?.data?.map((app: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: app.appStatus,
      className: app.appName,
      footerText: app.description,
      headerText: `${app.appName}`,
      redirectUri: `/apps/?appName=${app.appName}`
    }

    return <GenericAppCard key={app.appName} genericAppCardProps={genericAppCardProps} />
  })

  return (
    <Fragment>
      <Show when={!apps.isLoading}>
        <Container>
          <h4 className="text-white">Lenstack Services</h4>
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
