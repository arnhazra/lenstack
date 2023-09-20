"use client"
import Loading from "@/_components/Loading"
import AppCard from "@/_components/AppCard"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import React from 'react'
import { Button, Container, Row } from "react-bootstrap"

const AppPage: NextPage = () => {
    const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
    const searchParams = useSearchParams()
    const router = useRouter()
    const appName = searchParams.get("appName")

    const selectedApp = apps?.data?.find((app: any) => {
        return app.appName === appName
    })

    const appsToDisplay = apps?.data?.filter((app: any) => app.appName !== appName).map((app: any) => {
        return <AppCard key={app.appName} appName={app.appName} url={app.url} appAvailable={app.appAvailable} description={app.description} dbRegion={app.dbRegion} />
    })

    const launchApp = () => {
        router.push(`/${appName}`)
    }

    return (
        <Container>
            <Show when={apps?.isLoading}>
                <Loading />
            </Show>
            <Show when={!apps?.isLoading}>
                <div className="jumbotron p-4">
                    <p className="branding text-capitalize">{selectedApp?.appName}</p>
                    <p className="lead mt-3">{selectedApp?.description}</p>
                    <Button className="tag-chip">{selectedApp?.dbRegion}</Button>
                    <Button className="tag-chip">{selectedApp?.appAvailable ? 'Available' : 'Under Maintainance'}</Button><br />
                    <Button className="mt-2" onClick={launchApp}>Go to App<ArrowRightIcon className="icon-right" /></Button>
                </div>
                <h4 className="dashboard-header mt-2">Other apps</h4>
                <Row className="mb-4 mt-2">
                    {appsToDisplay}
                </Row>
            </Show>
        </Container>
    )
}

export default AppPage