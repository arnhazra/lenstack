"use client"
import { Fragment } from "react"
import endPoints from "@/constants/apiEndpoints"
import Show from "@/components/Show"
import { Container, Table } from "react-bootstrap"
import Loading from "@/components/Loading"
import HTTPMethods from "@/constants/httpMethods"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import moment from "moment"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const FrostlakeProjectsPage: NextPage = () => {
    const projects = useFetch("project", endPoints.frostlakeGetProjectsEndpoint, HTTPMethods.POST)

    const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
        return (
            <tr key={project._id}>
                <td>{project.name}</td>
                <td>{moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
                <td><Link href={`/frostlake/project?id=${project._id}`}>Open Project<ExternalLinkIcon className="icon-right" /></Link></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!projects.isLoading}>
                <Container>
                    <Show when={projects?.data?.projects?.length > 0}>
                        <h4 className="text-white text-center">Projects</h4>
                        <Table responsive hover variant="light">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Created At</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={projects?.data?.projects?.length === 0}>
                        <div className="box">
                            <p className="branding">Projects</p>
                            <p className="lead">No Projects to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={projects.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(FrostlakeProjectsPage)