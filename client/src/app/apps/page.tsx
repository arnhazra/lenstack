"use client"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import Link from "next/link"
import { ReaderIcon, RocketIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Error from "@/components/ErrorComp"
import GenericAppCard from "@/components/GenericAppCard"
import { GenericAppCardInterface } from "@/types/Types"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/appStateProvider"
import GenericHero from "@/components/GenericHero"

export default function Page() {
  const [{ userState, globalSearchString }] = useContext(AppContext)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const searchParams = useSearchParams()
  const router = useRouter()
  const appName = searchParams.get("appName")
  const [filteredApps, setFilteredApps] = useState([])

  useEffect(() => {
    const filteredApps = apps?.data?.filter((app: any) =>
      app.appName.toLowerCase().includes(globalSearchString.toLowerCase())
    )
    setFilteredApps(filteredApps)
  }, [globalSearchString, apps.data])

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === appName
  })

  const appsToDisplay = filteredApps?.filter((app: any) => app.appName !== appName).map((app: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: app.appStatus,
      className: app.appCategory,
      footerText: app.description,
      headerText: app.appName,
      redirectUri: `/apps/?appName=${app.appName}`
    }

    return <GenericAppCard key={app.appName} genericAppCardProps={genericAppCardProps} />
  })

  const launchApp = () => {
    if (selectedApp.appStatus === "Available") {
      router.push(`/apps/${selectedApp.appName}`)
    }
  }

  return (
    <Container>
      <Show when={apps?.isLoading}>
        <Loading />
      </Show>
      <Show when={!apps?.isLoading}>
        <Show when={selectedApp}>
          <GenericHero>
            <p className="branding text-capitalize">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Button className="mt-2" disabled={selectedApp?.appStatus !== "Available" || userState.apiKey === ""} onClick={launchApp}><RocketIcon className="icon-left" />Launch App</Button>
            <Show when={!!selectedApp?.isDocumentationAvailable}>
              <Link className="btn mt-2" href={`/documentation?appName=${appName}`}><ReaderIcon className="icon-left" />View Documentation</Link>
            </Show>
          </GenericHero>
          <h4 className="text-white mt-2">Other Apps</h4>
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
