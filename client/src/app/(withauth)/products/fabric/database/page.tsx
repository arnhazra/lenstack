"use client"
import Error from "@/components/error-component"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useConfirm from "@/hooks/use-confirm"
import useFetch from "@/hooks/use-fetch"
import { TrashIcon, CubeIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import Hero from "@/components/hero-component"
import SensitiveInfoPanel from "@/components/sensitiveinfopanel-component"

export default function Page() {
  const searchParams = useSearchParams()
  const dbId = searchParams.get("dbId")
  const db = useFetch("view db", `${endPoints.fabricViewDb}`, HTTPMethods.POST, { dbId }, true)
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
