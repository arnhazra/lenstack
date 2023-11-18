"use client"
import GenericHero from "@/components/generichero.component"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import Constants from "@/constants/global.constants"
import HTTPMethods from "@/constants/http.methods"
import useFetch from "@/hooks/useFetch"
import { RocketIcon, ReaderIcon } from "@radix-ui/react-icons"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { Badge, Button, Container, Form } from "react-bootstrap"
import toast from "react-hot-toast"
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

export default function Page() {
  const [api, setApi] = useState("")
  const [response, setReseponse] = useState({})
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "ledgerscan" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "ledgerscan")
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(`${endPoints.ledgerscanAnalyzer}${api}`)
      setReseponse(res.data)
    }

    catch (error: any) {
      setReseponse({})

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
      }

      else {
        toast.error(Constants.ToastError)
      }
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Show when={!products.isLoading}>
        <GenericHero>
          <p className="branding">{selectedProduct?.productName}</p>
          <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
          <div className="mb-2">
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
          </div>
          <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn">
            <ReaderIcon className="icon-left" />API Reference
          </Link>
        </GenericHero>
        <GenericHero>
          <p className="branding">API Client (No need to pass Base URI)</p>
          <form onSubmit={hitAPI}>
            <Form.Label htmlFor="basic-url">Your test API endpoint {endPoints.ledgerscanAnalyzer}</Form.Label>
            <Form.Control placeholder="Your test API endpoint" required onChange={(e) => setApi(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
            <Button disabled={isLoading} className="mt-3" type="submit">
              <Show when={!isLoading}>
                <RocketIcon className="icon-left" />Hit API
              </Show>
              <Show when={isLoading}>
                <i className="fas fa-circle-notch fa-spin"></i> Loading
              </Show>
            </Button>
          </form>
          <p>Response</p>
          <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
        </GenericHero>
      </Show>
      <Show when={products.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}
