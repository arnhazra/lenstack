"use client"
import Show from "@/_components/Show"
import Constants from "@/_constants/appConstants"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { useSearchParams } from "next/navigation"
import { Container, Form } from "react-bootstrap"
import Loading from "../loading"
import Error from "@/_components/ErrorComp"
import "react-json-view-lite/dist/index.css"
import GenericHero from "@/_components/GenericHero"

export default function Page() {
  const searchParams = useSearchParams()
  const appName = searchParams.get("appName")
  const documentation = useFetch("docs", `${endPoints.getdocumentation}`, HTTPMethods.POST, { appName })

  const listApiDocumentations = documentation?.data?.docList?.map((apiDoc: any) => {
    return (
      <GenericHero key={apiDoc._id}>
        <p className="branding">{apiDoc.apiName}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Method: {apiDoc.apiMethod}</Form.Label>
          <Form.Control readOnly type="email" defaultValue={`${Constants.AppBaseUri}${apiDoc.apiUri}`} />
        </Form.Group>
        <Show when={!!apiDoc.sampleRequestBody}>
          <p>Sample Request Body</p>
          <JsonView data={apiDoc.sampleRequestBody ?? {}} shouldExpandNode={allExpanded} style={defaultStyles} /><br />
        </Show>
        <Show when={!!apiDoc.sampleResponseBody}>
          <p>Sample Response Body</p>
          <JsonView data={apiDoc.sampleResponseBody} shouldExpandNode={allExpanded} style={defaultStyles} />
        </Show>
      </GenericHero>
    )
  })

  return (
    <Container>
      <Show when={documentation.isLoading}>
        <Loading />
      </Show>
      <Show when={!documentation.isLoading}>
        <Show when={!!documentation?.data?.docList.length}>
          <div>
            <h4 className="text-white">API Documentation - {appName}</h4>
            <p className="lead text-white">Must include your API key under x-api-key in request header</p>
            {listApiDocumentations}
          </div>
        </Show>
        <Show when={!documentation?.data?.docList.length}>
          <Error />
        </Show>
      </Show>
    </Container>
  )
}
