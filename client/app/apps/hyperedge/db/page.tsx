"use client"
import Error from "@/_components/ErrorComp"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useConfirm from "@/_hooks/useConfirm"
import useFetch from "@/_hooks/useFetch"
import { ArchiveIcon, CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useContext } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { AppContext } from "@/_context/appStateProvider"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const searchParams = useSearchParams()
  const dbId = searchParams.get("dbId")
  const db = useFetch("view db", `${endPoints.hyperedgeViewDbEndpoint}?dbId=${dbId}`, HTTPMethods.POST, {}, true)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

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
      router.push("/apps/hyperedge")
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
        <Show when={!db.error || !!dbId}>
          <Container>
            <div className="jumbotron p-4">
              <p className="display-6 text-capitalize">{db?.data?.db?.name}</p>
              <p className="lead mt-3">Your Db kvs will be displayed below (if any)</p>
              <Button onClick={copyDbId}>Copy Db Id<CopyIcon className="icon-right" /></Button>
              <Button onClick={copyDbPassword}>Copy Db Password<CopyIcon className="icon-right" /></Button>
              <Button onClick={archiveDb}>Archive Db<ArchiveIcon className="icon-right" /></Button>
            </div>
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
        <Show when={!!db.error || !dbId}>
          <Error />
        </Show>
      </Show>
      <Show when={db?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
