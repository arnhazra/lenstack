"use client"
import { useContext } from "react"
import Loading from "@/_components/Loading"
import AppCard from "@/_components/AppCard"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Error from "@/_components/ErrorComp"

export default function Page() {
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const searchParams = useSearchParams()
  const router = useRouter()
  const appName = searchParams.get("appName")

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === appName
  })

  const appsToDisplay = apps?.data?.filter((app: any) => app.appName !== appName).map((app: any) => {
    return <AppCard key={app.appName} appName={app.appName} appStatus={app.appStatus} description={app.description} dbRegion={app.dbRegion} />
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
            <Button className="mt-2" onClick={launchApp}>Launch App<ArrowRightIcon className="icon-right" /></Button>
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
