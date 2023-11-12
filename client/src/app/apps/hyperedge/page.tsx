"use client"
import { Fragment, useContext } from "react"
import endPoints from "@/constants/apiEndpoints"
import Show from "@/components/Show"
import { Badge, Container, Row } from "react-bootstrap"
import Loading from "@/components/Loading"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import moment from "moment"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GenericHero from "@/components/GenericHero"
import { GenericAppCardInterface } from "@/types/Types"
import GenericAppCard from "@/components/GenericAppCard"
import { AppContext } from "@/context/appStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(AppContext)
  const dbs = useFetch("dbs", endPoints.hyperedgeGetMyDbsEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "hyperedge"
  })

  const dbsToDisplay = dbs?.data?.dbs?.map((db: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: "Project",
      className: "centralized",
      headerText: db.name,
      footerText: `This Database was created by you using Hyperedge on ${moment(db.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
      redirectUri: `/apps/hyperedge/db?dbId=${db._id}`
    }

    return (
      <GenericAppCard key={db._id} genericAppCardProps={genericAppCardProps} />
    )
  })

  return (
    <Fragment>
      <Show when={!dbs.isLoading}>
        <Container>
          <GenericHero>
            <p className="branding">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Link className="btn" href="/apps/hyperedge/createdb"><PlusCircledIcon className="icon-left" />Create Database</Link>
          </GenericHero>
          <Show when={dbs?.data?.dbs?.length > 0}>
            <h4 className="text-white">My Databases</h4>
            <Row className="mt-2 mb-2">
              {dbsToDisplay}
            </Row>
          </Show>
          <Show when={dbs?.data?.dbs?.length === 0}>
            <h4 className="text-white">No databases to display</h4>
          </Show>
        </Container>
      </Show>
      <Show when={dbs.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
