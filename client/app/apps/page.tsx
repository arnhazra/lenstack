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
import { Button, Container, Row } from "react-bootstrap"
import Error from "@/_components/ErrorComp"
import { AppContext } from "@/_context/appStateProvider"
import Link from "next/link"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const searchParams = useSearchParams()
  const router = useRouter()
  const appName = searchParams.get("appname")

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === appName
  })

  const appsToDisplay = apps?.data?.filter((app: any) => app.appName !== appName).map((app: any) => {
    return <AppCard key={app.appName} appName={app.appName} url={app.url} appStatus={app.appStatus} description={app.description} dbRegion={app.dbRegion} />
  })

  const launchApp = () => {
    router.push(`/${appName}`)
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
            <Button className="tag-chip">{selectedApp?.dbRegion}</Button>
            <Button className="tag-chip">{selectedApp?.appStatus ? "Available" : "Under Maintainance"}</Button><br />
            <Show when={userState.selectedPlan !== "No Subscription"}>
              <Button className="mt-2" onClick={launchApp}>Launch App<ArrowRightIcon className="icon-right" /></Button>
            </Show>
            <Show when={userState.selectedPlan === "No Subscription"}>
              <Link href={"/subscribe"}>
                <Button className="mt-2">Subscribe & Continue<ArrowRightIcon className="icon-right" /></Button>
              </Link>
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
