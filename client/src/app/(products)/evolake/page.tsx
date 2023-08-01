"use client"
import withAuth from "@/utils/withAuth"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import { AppContext } from "@/context/appStateProvider"
import axios from "axios"
import React, { Fragment, useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/httpMethods"
import Link from "next/link"
import SourceCode from "@/components/SourceCode"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const EvolakeQueryEnginePage: NextPage = () => {
    const [selectedDb, setSelectedDb] = useState("SQL")
    const [model, setModel] = useState("text-davinci-003")
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
            const response = await axios.post(endPoints.evolakeGenerateQueryEndpint, { selectedDb, userQuery, apiKey, model })
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
                <form className="box" onSubmit={fetchData}>
                    <p className="branding">Query Engine</p>
                    <Form.Group controlId="floatingSelectGrid">
                        <Form.Label>Select OpenAI Model</Form.Label>
                        <Form.Select size="lg" onChange={(e): void => setModel(e.target.value)}>
                            <option className="options" key={"text-davinci-003"} value={"text-davinci-003"}>{"text-davinci-003"}</option>
                            <option className="options" key={"text-davinci-002"} value={"text-davinci-002"}>{"text-davinci-002"}</option>
                        </Form.Select>
                    </Form.Group>
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
                    <Button type="submit" disabled={isFetching} className="btn-block mt-4">
                        <Show when={!isFetching}>Generate DB Query <ArrowRightIcon className="icon-right" /></Show>
                        <Show when={isFetching}><i className="fas fa-circle-notch fa-spin"></i> Fetching</Show>
                    </Button>
                    <Show when={!!dbQuery}>
                        <SourceCode copyBtn>
                            {dbQuery}
                        </SourceCode>
                    </Show>
                    <Link className="lead-link" href={"/evolake/queryhistory"}>My Query History</Link>
                </form>
            </Container>
        </Fragment >
    )
}

export default withAuth(EvolakeQueryEnginePage)