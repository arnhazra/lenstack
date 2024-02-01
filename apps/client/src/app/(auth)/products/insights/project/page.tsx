"use client"
import Error from "@/components/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { TrashIcon, CubeIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button, Container, Table } from "react-bootstrap"
import Hero from "@/components/hero"
import SensitiveInfoPanel from "@/components/sensitive-infopanel"
import { useConfirmContext } from "@/context/providers/confirm.provider"
import { format } from "date-fns"

export default function Page() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const project = useQuery(["project"], `${endPoints.insightsViewProject}?projectId=${projectId}`, HTTPMethods.GET)
  const router = useRouter()
  const { confirm } = useConfirmContext()

  const displayAnalytics = useCallback(() => {
    const analyticsToDisplay = project?.data?.analytics?.map((ant: any) => {
      return (
        <tr key={ant._id}>
          <td>{ant.component}</td>
          <td>{ant.event}</td>
          <td>{ant.info}</td>
          <td>{ant.statusCode}</td>
          <td>{format(new Date(ant.createdAt), "MMM, do yyyy, h:mm a")}</td>
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
    <Suspense condition={!project?.isLoading} fallback={<Loading />}>
      <Suspense condition={!project.error && !!projectId} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding">{project?.data?.project?.name}</p>
            <p className="muted-text mt-3">Your Project Analytics will be displayed below (if any)</p>
            <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Project ID" credentialValue={project?.data?.project?._id} />
            <SensitiveInfoPanel credentialIcon={<LockOpen2Icon />} credentialName="Project Passkey" credentialValue={project?.data?.project?.projectPasskey} />
            <Button variant="danger" onClick={deleteProject}>Delete Project<TrashIcon className="icon-right" /></Button>
          </Hero>
          <Suspense condition={!!project?.data?.analytics && project?.data?.analytics.length} fallback={null}>
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
          </Suspense>
        </Container>
      </Suspense>
    </Suspense>
  )
}
