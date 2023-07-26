"use client"
import { Fragment } from "react"
import endPoints from "@/constants/apiEndpoints"
import Show from "@/components/Show"
import { Container, Row } from "react-bootstrap"
import Loading from "@/components/Loading"
import HTTPMethods from "@/constants/httpMethods"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import ProjectCard from "@/components/ProjectCard"

const FrostlakeAnalyticsPage: NextPage = () => {
    const projects = useFetch("project", endPoints.frostlakeGetProjectsEndpoint, HTTPMethods.POST)

    const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
        return (
            <ProjectCard id={project._id} name={project.name} key={project._id} />
        )
    })

    return (
        <Fragment>
            <Show when={!projects.isLoading}>
                <Container>
                    <Show when={projects?.data?.projects?.length > 0}>
                        <h4 className="text-white text-center">Projects</h4>
                        <Row>
                            {projectsToDisplay}
                        </Row>
                    </Show>
                    <Show when={projects?.data?.projects?.length === 0}>
                        <div className="box">
                            <p className="branding">Projects <i className="fa-solid fa-database"></i></p>
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

export default withAuth(FrostlakeAnalyticsPage)