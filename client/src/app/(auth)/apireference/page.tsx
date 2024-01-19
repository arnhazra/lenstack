"use client"
import Suspense from "@/components/suspense"
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
import { useCallback, Suspense as RSuspense } from "react"

export default function Page() {
  const searchParams = useSearchParams()
  const productName = searchParams.get("productName")
  const apireference = useQuery(["apireference"], `${endPoints.getapireference}?productName=${productName}`, HTTPMethods.GET)

  const displayAPIReferences = useCallback(() => {
    const listApiApiReferences = apireference?.data?.docList?.map((apiDoc: any) => {
      return (
        <Hero key={apiDoc._id}>
          <p className="branding">{apiDoc.apiName}</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Method: {apiDoc.apiMethod}</Form.Label>
            <Form.Control readOnly type="text" defaultValue={`${apiHost.toLowerCase()}${apiDoc.apiUri}`} />
          </Form.Group>
          <Suspense condition={!!apiDoc.sampleRequestBody} fallback={null}>
            <p>Sample Request Body</p>
            <JsonView data={apiDoc.sampleRequestBody ?? {}} shouldExpandNode={allExpanded} style={defaultStyles} /><br />
          </Suspense>
          <Suspense condition={!!apiDoc.sampleResponseBody} fallback={null}>
            <p>Sample Response Body</p>
            <JsonView key={apiDoc._id} data={apiDoc.sampleResponseBody} shouldExpandNode={allExpanded} style={defaultStyles} />
          </Suspense>
        </Hero>
      )
    })

    return (
      <RSuspense fallback={null}>
        <Suspense condition={!!apireference?.data?.docList.length} fallback={<Error />}>
          <div>
            <h4 className="text-white text-capitalize">API Reference - {uiConstants.brandName} {productName}</h4>
            <p className="lead text-white">You must include your Client ID under "client_id" & Client Secret under "client_secret" in request header</p>
            {listApiApiReferences}
          </div>
        </Suspense>
      </RSuspense>
    )
  }, [apireference?.data])

  return (
    <Container>
      <Suspense condition={!apireference.isLoading} fallback={<Loading />}>
        <Suspense condition={!apireference.error} fallback={<Loading />}>
          <Suspense condition={!!apireference?.data?.docList.length} fallback={<Error />}>
            {displayAPIReferences()}
          </Suspense>
        </Suspense>
      </Suspense>
    </Container>
  )
}
