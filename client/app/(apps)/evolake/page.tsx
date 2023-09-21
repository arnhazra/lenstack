"use client"
import withAuth from "@/_utils/withAuth"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import React, { Fragment, useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import useFetch from "@/_hooks/useFetch"
import HTTPMethods from "@/_constants/httpMethods"
import Link from "next/link"
import SourceCode from "@/_components/SourceCode"
import { ArrowRightIcon, TextNoneIcon } from "@radix-ui/react-icons"

function Page() {
    const [selectedDb, setSelectedDb] = useState("SQL")
    const [userQuery, setUserQuery] = useState("")
    const [dbQuery, setDbQuery] = useState("")
    const [{ userState }] = useContext(AppContext)
    const [isFetching, setFetching] = useState(false)
    const dbList = useFetch("database list", endPoints.evolakeGetDatabaseListEndpoint, HTTPMethods.POST)

    const dbToDisplay = dbList?.data?.dbOptions.map((db: any) => {
        return <option className="options" key={db.value} value={db.value}>{db.label}</option>
    })

    const fetchData = async (e: any) => {
        e.preventDefault()
        try {
            setFetching(true)
            const apiKey = userState.apiKey
            const response = await axios.post(endPoints.evolakeGenerateQueryEndpint, { selectedDb, userQuery, apiKey })
            setDbQuery(response.data.msg)
            setFetching(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.msg || "Unknown Error, try again")
            setFetching(false)
        }
    }

    return (
        <Fragment>
            <Container>
                <form className="jumbotron p-4" onSubmit={fetchData}>
                    <p className="branding">Querygen</p>
                    <Form.Group controlId="floatingSelectGrid" className="mt-2">
                        <Form.Label>Select Database</Form.Label>
                        <Form.Select size="lg" onChange={(e): void => setSelectedDb(e.target.value)}>
                            {dbToDisplay}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="floatingQuery" className="mt-2">
                        <Form.Label>Ask Your Query</Form.Label>
                        <Form.Control size="lg" type="text" disabled={isFetching} placeholder="Ask Your Query" onChange={(e) => setUserQuery(e.target.value)} autoComplete={"off"} required />
                    </Form.Group>
                    <Button type="submit" disabled={isFetching} className="mt-4">
                        <Show when={!isFetching}>Generate DB Query <ArrowRightIcon className="icon-right" /></Show>
                        <Show when={isFetching}><i className="fas fa-circle-notch fa-spin"></i> Fetching</Show>
                    </Button>
                    <Show when={!!dbQuery}>
                        <SourceCode copyBtn>
                            {dbQuery}
                        </SourceCode>
                    </Show>
                    <Link className="btn mt-4" href={"/evolake/queryhistory"}>My Query History<TextNoneIcon className="icon-right" /></Link>
                </form>
            </Container>
        </Fragment >
    )
}

export default withAuth(Page)