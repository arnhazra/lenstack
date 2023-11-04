"use client"
import Constants from "@/_constants/appConstants"
import { RocketIcon, ReaderIcon } from "@radix-ui/react-icons"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

export default function Page() {
  const [api, setApi] = useState("")
  const [response, setReseponse] = useState({})

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${Constants.AppBaseUri}/hexscan/analyzer${api}`)
      setReseponse(res.data)
    } catch (error) {
      setReseponse({})
    }
  }

  return (
    <Container>
      <div className="jumbotron p-4">
        <p className="branding">Hexscan</p>
        <p className="lead">
          This application adopts an API-first approach, prioritizing
          the smooth integration of its functionality into various external applications.
          Before initiating the integration process, it is essential to acquire a valid API
          key through a purchase. For comprehensive testing of the APIs, we provide an
          intuitive API client. Please be aware that utilizing the API client for
          testing purposes will consume your allotted API credits. Access to the API client is
          contingent upon having an active subscription; without one, the API client will not be
          accessible. We encourage you to refer to the documentation for detailed instructions
          on incorporating the API seamlessly into your application.
        </p>
        <Link className="btn mt-2" href={`/documentation?appName=hexscan`}><ReaderIcon className="icon-left" />View Documentation</Link>
      </div>
      <div className="jumbotron p-4">
        <p className="branding">API Client (No need to pass Base URI)</p>
        <form onSubmit={hitAPI}>
          <Form.Label htmlFor="basic-url">Your test API endpoint {Constants.AppBaseUri}/api/hexscan/analyzer</Form.Label>
          <Form.Control required onChange={(e) => setApi(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
          <Button className="mt-3" type="submit"><RocketIcon className="icon-left" />Hit API</Button>
        </form>
        <p>Response</p>
        <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
      </div>
    </Container>
  )
}
