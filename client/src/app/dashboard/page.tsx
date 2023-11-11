"use client"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import { Fragment } from "react"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import { Container, Row } from "react-bootstrap"
import { GenericAppCardInterface } from "@/types/Types"
import GenericAppCard from "@/components/GenericAppCard"

export default function Page() {
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const appsToDisplay = apps?.data?.map((app: any) => {
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
