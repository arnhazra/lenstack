"use client"
import Error from "@/components/ErrorComp"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useConfirm from "@/hooks/useConfirm"
import useFetch from "@/hooks/useFetch"
import { ArchiveIcon, CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Constants from "@/constants/globalConstants"
import GenericHero from "@/components/GenericHero"

export default function Page() {
  const searchParams = useSearchParams()
  const dbId = searchParams.get("dbId")
  const db = useFetch("view db", `${endPoints.hyperedgeViewDbEndpoint}`, HTTPMethods.POST, { dbId }, true)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()
  console.log(db.error)

  const kvsToDisplay = db?.data?.kvs?.map((kv: any) => {
    return (
      <tr key={kv._id}>
        <td>{kv.key}</td>
        <td>{kv.value}</td>
      </tr>
    )
  })

  const archiveDb = async () => {
    const userConsent = await confirm("Are you sure to archive this db?")

    if (userConsent) {
      await axios.delete(`${endPoints.hyperedgeDeleteDbEndpoint}?dbId=${dbId}`)
      router.push("/products/hyperedge")
    }
  }

  const copyDbId = (): void => {
    navigator.clipboard.writeText(`${db?.data?.db?.dbId}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const copyDbPassword = (): void => {
    navigator.clipboard.writeText(`${db?.data?.db?.dbPassword}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!db?.isLoading}>
        <Show when={!!dbId && !db.error}>
          <Container>
            <GenericHero>
              <p className="branding text-capitalize">{db?.data?.db?.name}</p>
              <p className="muted-text mt-3">Your Db kvs will be displayed below (if any)</p>
              <Button onClick={copyDbId}>Copy Db Id<CopyIcon className="icon-right" /></Button>
              <Button onClick={copyDbPassword}>Copy Db Password<CopyIcon className="icon-right" /></Button>
              <Button onClick={archiveDb}>Archive Db<ArchiveIcon className="icon-right" /></Button>
            </GenericHero>
            <Show when={!!db?.data?.kvs && db?.data?.kvs.length}>
              <h4 className="text-white">KVs</h4>
              <Table responsive hover variant="light">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {kvsToDisplay}
                </tbody>
              </Table>
            </Show>
            {confirmDialog()}
          </Container>
        </Show>
        <Show when={!dbId || !!db.error}>
          <Error />
        </Show>
      </Show>
      <Show when={db?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
