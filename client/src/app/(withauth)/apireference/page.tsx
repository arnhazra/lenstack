"use client"
import Show from "@/components/show-component"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import { endPoints, apiHost } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/use-fetch"
import { useSearchParams } from "next/navigation"
import { Container, Form } from "react-bootstrap"
import Loading from "@/components/loading-component"
import Error from "@/components/error-component"
import "react-json-view-lite/dist/index.css"
import Hero from "@/components/hero-component"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const searchParams = useSearchParams()
  const productName = searchParams.get("productName")
  const apireference = useFetch("apireference", `${endPoints.getapireference}`, HTTPMethods.POST, { productName })

  const listApiApiReferences = apireference?.data?.docList?.map((apiDoc: any) => {
    return (
      <Hero key={apiDoc._id}>
        <p className="branding">{apiDoc.apiName}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Method: {apiDoc.apiMethod}</Form.Label>
          <Form.Control readOnly type="email" defaultValue={`${apiHost.toLowerCase()}${apiDoc.apiUri}`} />
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
    <Container>
      <Show when={apireference.isLoading}>
        <Loading />
      </Show>
      <Show when={!apireference.isLoading}>
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
      </Show>
    </Container>
  )
}
