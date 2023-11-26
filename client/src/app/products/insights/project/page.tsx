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
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import Hero from "@/components/hero.component"
import { maskCredential } from "@/utils/mask-credential"
import { copyCredential } from "@/utils/copy-credential"

export default function Page() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const project = useFetch("view project", `${endPoints.insightsViewProject}?projectId`, HTTPMethods.POST, { projectId }, true)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const analyticsToDisplay = project?.data?.analytics?.map((ant: any) => {
    return (
      <tr key={ant._id}>
        <td>{ant.component}</td>
        <td>{ant.event}</td>
        <td>{ant.info}</td>
        <td>{ant.statusCode}</td>
        <td>{moment(ant.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
      </tr>
    )
  })

  const deleteProject = async () => {
    const userConsent = await confirm("Are you sure to delete this project?")

    if (userConsent) {
      await axios.delete(`${endPoints.insightsDeleteProject}?projectId=${projectId}`)
      router.push("/products/insights")
    }
  }

  return (
    <Fragment>
      <Show when={!project?.isLoading}>
        <Show when={!project.error && !!projectId}>
          <Container>
            <Hero>
              <p className="branding">{project?.data?.project?.name}</p>
              <p className="muted-text mt-3">Your Project Analytics will be displayed below (if any)</p>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Row className="mt-2 mb-2">
                    <Col className="categorycol-hero">
                      <CubeIcon />
                    </Col>
                    <Col>
                      <p className="herocategory-key">Project ID</p>
                      <div className="herocategory-value">
                        {maskCredential(projectId)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(projectId)} />
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
                      <p className="herocategory-key">Project Passkey</p>
                      <div className="herocategory-value">
                        {maskCredential(project?.data?.project?.projectPasskey)}<CopyIcon className="icon-right" onClick={(): void => copyCredential(project?.data?.project?.projectPasskey)} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button onClick={deleteProject}>Delete Project<TrashIcon className="icon-right" /></Button>
            </Hero>
            <Show when={!!project?.data?.analytics && project?.data?.analytics.length}>
              <h4 className="text-white">Analytics</h4>
              <Table responsive hover variant="light">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Event</th>
                    <th>Info</th>
                    <th>Status Code</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsToDisplay}
                </tbody>
              </Table>
            </Show>
            {confirmDialog()}
          </Container>
        </Show>
        <Show when={!!project.error || !projectId}>
          <Error />
        </Show>
      </Show>
      <Show when={project?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
