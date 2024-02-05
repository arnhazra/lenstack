"use client"
import Error from "@/components/error"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ReaderIcon, RocketIcon } from "@radix-ui/react-icons"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { Badge, Button, Container, Form } from "react-bootstrap"
import toast from "react-hot-toast"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=copilot`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "copilot")
  const [prompt, setPrompt] = useState("")
  const [response, setReseponse] = useState({})
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      setReseponse({})
      setLoading(true)
      const res = await axios.post(`${endPoints.copilotGenerateEndpoint}`, { prompt })
      setReseponse(res.data)
    }

    catch (error: any) {
      setReseponse({})

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
      }

      else {
        toast.error(uiConstants.toastError)
      }
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Suspense condition={!products.isLoading} fallback={<Loading />}>
        <Suspense condition={!products.error} fallback={<Error />}>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-secondary">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
            <p className="muted-text mt-1">API Client</p>
            <form onSubmit={hitAPI}>
              <Form.Label htmlFor="basic-url">Your test prompt</Form.Label>
              <Form.Control placeholder="Your test prompt" required onChange={(e) => setPrompt(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
              <Button variant="primary" disabled={isLoading} className="mt-3" type="submit">
                <Suspense condition={!isLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> Loading</>}>
                  <RocketIcon className="icon-left" />Hit API
                </Suspense>
              </Button>
            </form>
            <Suspense condition={Object.hasOwn(response, "response")} fallback={null}>
              <p>Response</p>
              <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
            </Suspense>
          </Hero>
        </Suspense>
      </Suspense>
    </Container>
  )
}
