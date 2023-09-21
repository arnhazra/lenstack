"use client"
import { Fragment } from "react"
import { NextPage } from "next"
import endPoints from "@/_constants/apiEndpoints"
import Show from "@/_components/Show"
import { Container, Table } from "react-bootstrap"
import Loading from "@/_components/Loading"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import HTTPMethods from "@/_constants/httpMethods"
import withAuth from "@/_utils/withAuth"

function Page() {
    const queryHistory = useFetchRealtime("query history", endPoints.evolakeGetQueryHistoryEndpoint, HTTPMethods.POST)

    const queryHistoryToDisplay = queryHistory?.data?.queryHistory?.map((atc: any) => {
        return (
            <tr key={atc._id}>
                <td>{atc.query}</td>
                <td>{atc.response}</td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!queryHistory.isLoading}>
                <Container>
                    <Show when={queryHistory?.data?.queryHistory?.length > 0}>
                        <h4 className="text-white text-center">Query History</h4>
                        <Table responsive hover variant="light">
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryHistoryToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={queryHistory?.data?.queryHistory?.length === 0}>
                        <div className="box">
                            <p className="branding">Query History</p>
                            <p className="lead">No historical queries to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={queryHistory.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(Page)