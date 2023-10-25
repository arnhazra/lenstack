"use client"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import Link from "next/link"
import { ArrowRightIcon, ReaderIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Error from "@/_components/ErrorComp"
import GenericAppCard from "@/_components/GenericAppCard"
import { GenericAppCardInterface } from "@/_types/Types"
import { useContext } from "react"
import { AppContext } from "@/_context/appStateProvider"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const searchParams = useSearchParams()
  const router = useRouter()
  const appName = searchParams.get("appName")

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === appName
  })

  const appsToDisplay = apps?.data?.filter((app: any) => app.appName !== appName).map((app: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: app.appStatus,
      className: app.appName,
      footerText: app.description,
      headerText: app.appName,
      redirectUri: `/apps/?appName=${app.appName}`
    }

    return <GenericAppCard key={app.appName} genericAppCardProps={genericAppCardProps} />
  })

  const launchApp = () => {
    if (selectedApp.appStatus === "Available") {
      router.push(`/apps/${appName}`)
    }
  }

  return (
    <Container>
      <Show when={apps?.isLoading}>
        <Loading />
      </Show>
      <Show when={!apps?.isLoading}>
        <Show when={selectedApp}>
          <div className="jumbotron p-4">
            <p className="branding text-capitalize">{selectedApp?.appName}</p>
            <p className="lead mt-3">{selectedApp?.description}</p>
            <div className="mb-2">
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.dbRegion}</Badge>
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Button className="mt-2" disabled={selectedApp?.appStatus !== "Available" || userState.apiKey === ""} onClick={launchApp}>Launch App<ArrowRightIcon className="icon-right" /></Button>
            <Show when={!!selectedApp?.isDocumentationAvailable}>
              <Link className="btn mt-2" href={`/documentation?appName=${appName}`}>View Documentation <ReaderIcon className="icon-right" /></Link>
            </Show>
          </div>
          <h4 className="dashboard-header mt-2">Other Apps</h4>
          <Row className="mb-4 mt-2">
            {appsToDisplay}
          </Row>
        </Show>
        <Show when={!selectedApp}>
          <Error customMessage="App Not Found" />
        </Show>
      </Show >
    </Container >
  )
}
