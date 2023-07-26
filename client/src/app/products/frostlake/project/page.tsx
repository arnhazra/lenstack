"use client"
import Error from "@/components/ErrorComp"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetchRealtime from "@/hooks/useFetchRealtime"
import withAuth from "@/utils/withAuth"
import axios from "axios"
import moment from "moment"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"

const FrostlakeViewProjectPage: NextPage = () => {
    const searchParams = useSearchParams()
    const projectId = searchParams.get("id")
    const project = useFetchRealtime("view project", endPoints.frostlakeViewProjectEndpoint, HTTPMethods.POST, { projectId })
    const router = useRouter()

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
        const userConsent = confirm("Are you sure to archive this project?")

        if (userConsent) {
            await axios.delete(`${endPoints.frostlakeDeleteProjectEndpoint}/${projectId}`)
            router.push("/products/frostlake")
        }
    }

    return (
        <Fragment>
            <Show when={!project?.isLoading}>
                <Show when={!project.error}>
                    <Container>
                        <div className="jumbotron p-4">
                            <p className="display-6 text-capitalize">{project?.data?.project?.name}</p>
                            <p className="lead mt-3">Client Id: {project?.data?.project?.clientId}</p>
                            <p className="lead mt-3">Client Secret: {project?.data?.project?.clientSecret}</p>
                            <Button onClick={archiveProject}>Archive Project<i className="fa-solid fa-archive"></i></Button>
                            <Button onClick={() => router.push("/apireference")}>API Reference<i className="fa-solid fa-diamond-turn-right"></i></Button>
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
                    </Container>
                </Show>
                <Show when={project.error}>
                    <Error />
                </Show>
            </Show>
            <Show when={project?.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(FrostlakeViewProjectPage)