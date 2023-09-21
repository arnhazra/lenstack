"use client"
import Error from "@/_components/ErrorComp"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useConfirm from "@/_hooks/useConfirm"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import withAuth from "@/_utils/withAuth"
import { ArchiveIcon, ReaderIcon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"

function Page() {
    const searchParams = useSearchParams()
    const projectId = searchParams.get("projectid")
    const project = useFetchRealtime("view project", endPoints.frostlakeViewProjectEndpoint, HTTPMethods.POST, { projectId })
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

    const archiveProject = async () => {
        const userConsent = await confirm("Are you sure to archive this project?")

        if (userConsent) {
            await axios.delete(`${endPoints.frostlakeDeleteProjectEndpoint}/${projectId}`)
            router.push("/frostlake")
        }
    }

    return (
        <Fragment>
            <Show when={!project?.isLoading}>
                <Show when={!project.error || !!projectId}>
                    <Container>
                        <div className="jumbotron p-4">
                            <p className="display-6 text-capitalize">{project?.data?.project?.name}</p>
                            <p className="lead mt-3">Client Id: {project?.data?.project?.clientId}</p>
                            <p className="lead mt-3">Client Secret: {project?.data?.project?.clientSecret}</p>
                            <Button onClick={archiveProject}>Archive Project<ArchiveIcon className="icon-right" /></Button>
                            <Button onClick={() => router.push("/apireference")}>API Reference<ReaderIcon className="icon-right" /></Button>
                        </div>
                        <Show when={!!project?.data?.analytics.length}>
                            <h4 className="text-white text-center">Analytics</h4>
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
                <Show when={project.error || !projectId}>
                    <Error />
                </Show>
            </Show>
            <Show when={project?.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(Page)