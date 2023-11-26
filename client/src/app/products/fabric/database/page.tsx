"use client"
import Error from "@/components/error.component"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import useConfirm from "@/hooks/useConfirm"
import useFetch from "@/hooks/useFetch"
import { TrashIcon, CopyIcon, CubeIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import Hero from "@/components/hero.component"
import { maskCredential } from "@/utils/mask-credential"
import { copyCredential } from "@/utils/copy-credential"

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
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Row className="mt-2 mb-2">
                    <Col className="categorycol-hero">
                      <CubeIcon />
                    </Col>
                    <Col>
                      <p className="herocategory-key">DB ID</p>
                      <div className="herocategory-value">
                        {maskCredential(dbId)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(dbId)} />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Row className="mt-2 mb-2">
                    <Col className="categorycol-hero">
                      <LockOpen2Icon />
                    </Col>
                    <Col>
                      <p className="herocategory-key">DB Password</p>
                      <div className="herocategory-value">
                        {maskCredential(db?.data?.db?.dbPassword)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(db?.data?.db?.dbPassword)} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button onClick={deleteDb}>Delete Database<TrashIcon className="icon-right" /></Button>
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
