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
  const vaults = useFetch("vaults", endPoints.vuelockGetMyVaultsEndpoint, HTTPMethods.POST)

  const vaultsToDisplay = vaults?.data?.vaults?.map((vault: any) => {
    return (
      <tr key={vault._id}>
        <td>{vault.name}</td>
        <td>{moment(vault.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link href={`/apps/vuelock/vault?vaultId=${vault._id}`}>Open Vault<ExternalLinkIcon className="icon-right" /></Link></td>
      </tr>
    )
  })

  return (
    <Fragment>
      <Show when={!vaults.isLoading}>
        <Container>
          <div className="mb-3">
            <Link className="btn" href="/apps/vuelock/createvault">Create vault<ArrowRightIcon className="icon-right" /></Link>
          </div>
          <Show when={vaults?.data?.vaults?.length > 0}>
            <h4 className="text-white">My Vaults</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Vault Name</th>
                  <th>Created At</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {vaultsToDisplay}
              </tbody>
            </Table>
          </Show>
          <Show when={vaults?.data?.vaults?.length === 0}>
            <div className="box">
              <p className="branding">Vaults</p>
              <p className="lead">No vaults to display</p>
            </div>
          </Show>
        </Container>
      </Show>
      <Show when={vaults.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
