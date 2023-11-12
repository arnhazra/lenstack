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
  const projects = useFetch("projects", endPoints.frostlakeGetProjectsEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
  const selectedApp = apps?.data?.find((app: any) => app.appName === "frostlake")

  const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: "Project",
      className: "centralized",
      headerText: project.name,
      footerText: `This Project was started by you using Frostlake Platform on ${moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
      redirectUri: `/apps/frostlake/project?projectId=${project._id}`
    }

    return (
      <GenericAppCard key={project._id} genericAppCardProps={genericAppCardProps} />
    )
  })

  return (
    <Fragment>
      <Show when={!projects.isLoading}>
        <Container>
          <GenericHero>
            <p className="branding">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Link className="btn" href="/apps/frostlake/createproject"><PlusCircledIcon className="icon-left" />Create Project</Link>
          </GenericHero>
          <Show when={projects?.data?.projects?.length > 0}>
            <h4 className="text-white">Projects</h4>
            <Row className="mt-2 mb-2">
              {projectsToDisplay}
            </Row>
          </Show>
          <Show when={projects?.data?.projects?.length === 0}>
            <h4 className="text-white">No Projects to display</h4>
          </Show>
        </Container>
      </Show>
      <Show when={projects.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
