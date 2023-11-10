"use client"
import { Fragment } from "react"
import endPoints from "@/_constants/apiEndpoints"
import Show from "@/_components/Show"
import { Badge, Container, Table } from "react-bootstrap"
import Loading from "@/_components/Loading"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import moment from "moment"
import { ExternalLinkIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GenericHero from "@/_components/GenericHero"

export default function Page() {
  const projects = useFetch("project", endPoints.frostlakeGetProjectsEndpoint, HTTPMethods.POST)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "frostlake"
  })

  const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
    return (
      <tr key={project._id}>
        <td>{project.name}</td>
        <td>{moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link href={`/apps/centralized/frostlake/project?projectId=${project._id}`}>Open Project<ExternalLinkIcon className="icon-right" /></Link></td>
      </tr>
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
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appCategory}</Badge>
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Link className="btn" href="/apps/centralized/frostlake/createproject"><PlusCircledIcon className="icon-left" />Create Project</Link>
          </GenericHero>
          <Show when={projects?.data?.projects?.length > 0}>
            <h4 className="text-white">Projects</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Created At</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {projectsToDisplay}
              </tbody>
            </Table>
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
