"use client"
import Error from "@/components/error-component"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useConfirm from "@/hooks/use-confirm"
import useQuery from "@/hooks/use-query"
import { TrashIcon, CubeIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useCallback } from "react"
import { Button, Container, Table } from "react-bootstrap"
import Hero from "@/components/hero-component"
import SensitiveInfoPanel from "@/components/sensitiveinfopanel-component"

export default function Page() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const project = useQuery("view-project", `${endPoints.insightsViewProject}?projectId=${projectId}`, HTTPMethods.GET)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const displayAnalytics = useCallback(() => {
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

    return (
      <tbody>
        {analyticsToDisplay}
      </tbody>
    )
  }, [project?.data])

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
              <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Project ID" credentialValue={project?.data?.project?.projectId} />
              <SensitiveInfoPanel credentialIcon={<LockOpen2Icon />} credentialName="Project Passkey" credentialValue={project?.data?.project?.projectPasskey} />
              <Button variant="danger" onClick={deleteProject}>Delete Project<TrashIcon className="icon-right" /></Button>
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
                {displayAnalytics()}
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
