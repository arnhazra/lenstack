"use client"
import Show from "@/components/show"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import { endPoints, apiHost } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { useSearchParams } from "next/navigation"
import { Container, Form } from "react-bootstrap"
import Loading from "@/components/loading"
import Error from "@/components/error"
import "react-json-view-lite/dist/index.css"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import { Fragment, useCallback } from "react"

export default function Page() {
  const searchParams = useSearchParams()
  const productName = searchParams.get("productName")
  const apireference = useQuery("get-apireference", `${endPoints.getapireference}?productName=${productName}`, HTTPMethods.GET)

  const displayAPIReferences = useCallback(() => {
    const listApiApiReferences = apireference?.data?.docList?.map((apiDoc: any) => {
      return (
        <Hero key={apiDoc._id}>
          <p className="branding">{apiDoc.apiName}</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Method: {apiDoc.apiMethod}</Form.Label>
            <Form.Control readOnly type="text" defaultValue={`${apiHost.toLowerCase()}${apiDoc.apiUri}`} />
          </Form.Group>
          <Show when={!!apiDoc.sampleRequestBody}>
            <p>Sample Request Body</p>
            <JsonView data={apiDoc.sampleRequestBody ?? {}} shouldExpandNode={allExpanded} style={defaultStyles} /><br />
          </Show>
          <Show when={!!apiDoc.sampleResponseBody}>
            <p>Sample Response Body</p>
            <JsonView key={apiDoc._id} data={apiDoc.sampleResponseBody} shouldExpandNode={allExpanded} style={defaultStyles} />
          </Show>
        </Hero>
      )
    })

    return (
      <Fragment>
        <Show when={!!apireference?.data?.docList.length}>
          <div>
            <h4 className="text-white text-capitalize">API Reference - {uiConstants.brandName} {productName}</h4>
            <p className="lead text-white">You must include your Client ID under "client_id" & Client Secret under "client_secret" in request header</p>
            {listApiApiReferences}
          </div>
        </Show>
        <Show when={!apireference?.data?.docList.length}>
          <Error />
        </Show>
      </Fragment>
    )
  }, [apireference?.data])

  return (
    <Container>
      <Show when={apireference.isLoading}>
        <Loading />
      </Show>
      <Show when={!apireference.isLoading}>
        <Show when={!!apireference?.data?.docList.length}>
          {displayAPIReferences()}
        </Show>
        <Show when={!apireference?.data?.docList.length}>
          <Error />
        </Show>
      </Show>
    </Container>
  )
}
