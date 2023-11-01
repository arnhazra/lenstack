"use client"
import { Fragment } from "react"
import endPoints from "@/_constants/apiEndpoints"
import Show from "@/_components/Show"
import { Container, Table } from "react-bootstrap"
import Loading from "@/_components/Loading"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import moment from "moment"
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function Page() {
  const dbs = useFetch("dbs", endPoints.hyperedgeGetMyDbsEndpoint, HTTPMethods.POST)

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
          <div className="mb-3">
            <Link className="btn" href="/apps/hyperedge/createdb">Create db<ArrowRightIcon className="icon-right" /></Link>
          </div>
          <Show when={dbs?.data?.dbs?.length > 0}>
            <h4 className="text-white">My dbs</h4>
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
            <div className="box">
              <p className="branding">dbs</p>
              <p className="lead">No dbs to display</p>
            </div>
          </Show>
        </Container>
      </Show>
      <Show when={dbs.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
