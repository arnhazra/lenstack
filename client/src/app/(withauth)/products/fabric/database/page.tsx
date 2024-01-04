"use client"
import Error from "@/components/error"
import Loading from "@/components/loading"
import Show from "@/components/show"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useConfirm from "@/hooks/use-confirm"
import useQuery from "@/hooks/use-query"
import { TrashIcon, CubeIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useCallback } from "react"
import { Button, Container, Table } from "react-bootstrap"
import Hero from "@/components/hero"
import SensitiveInfoPanel from "@/components/sensitive-infopanel"

export default function Page() {
  const searchParams = useSearchParams()
  const dbId = searchParams.get("dbId")
  const db = useQuery("view-db", `${endPoints.fabricViewDb}`, HTTPMethods.POST, { dbId })
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const displayKvs = useCallback(() => {
    const kvsToDisplay = db?.data?.kvs?.map((kv: any) => {
      return (
        <tr key={kv._id}>
          <td>{kv.key}</td>
          <td>{kv.value}</td>
        </tr>
      )
    })

    return (
      <tbody>
        {kvsToDisplay}
      </tbody>
    )
  }, [db?.data])

  const deleteDb = async () => {
    const userConsent = await confirm("Are you sure to delete this db?")

    if (userConsent) {
      await axios.delete(`${endPoints.fabricDeleteDb}?dbId=${dbId}`)
      router.push("/products/fabric")
    }
  }

  return (
    <Fragment>
      <Show when={!db?.isLoading}>
        <Show when={!!dbId && !db.error}>
          <Container>
            <Hero>
              <p className="branding text-capitalize">{db?.data?.db?.name}</p>
              <p className="muted-text mt-3">Your Db kvs will be displayed below (if any)</p>
              <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="DB ID" credentialValue={db?.data?.db?.dbId} />
              <SensitiveInfoPanel credentialIcon={<LockOpen2Icon />} credentialName="DB Password" credentialValue={db?.data?.db?.dbPassword} />
              <Button variant="danger" onClick={deleteDb}>Delete Database<TrashIcon className="icon-right" /></Button>
            </Hero>
            <Show when={!!db?.data?.kvs && db?.data?.kvs.length}>
              <h4 className="text-white">KVs</h4>
              <Table responsive hover variant="light">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                {displayKvs()}
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
