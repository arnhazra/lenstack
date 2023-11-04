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

export default function Page() {
  const dbs = useFetch("dbs", endPoints.hyperedgeGetMyDbsEndpoint, HTTPMethods.POST)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "hyperedge"
  })

  const dbsToDisplay = dbs?.data?.dbs?.map((db: any) => {
    return (
      <tr key={db._id}>
        <td>{db.name}</td>
        <td>{moment(db.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link href={`/apps/hyperedge/db?dbId=${db._id}`}>Open db<ExternalLinkIcon className="icon-right" /></Link></td>
      </tr>
    )
  })

  return (
    <Fragment>
      <Show when={!dbs.isLoading}>
        <Container>
          <div className="jumbotron p-4">
            <p className="branding">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
            <div className="mb-2">
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.dbRegion}</Badge>
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Link className="btn" href="/apps/hyperedge/createdb"><PlusCircledIcon className="icon-left" />Create Database</Link>
          </div>
          <Show when={dbs?.data?.dbs?.length > 0}>
            <h4 className="text-white">My Databases</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>db Name</th>
                  <th>Created At</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {dbsToDisplay}
              </tbody>
            </Table>
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
