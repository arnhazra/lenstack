"use client"
import Error from "@/components/error"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ReaderIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Fragment } from "react"
import { Badge, Container } from "react-bootstrap"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=copilot`, HTTPMethods.GET)
  console.log(products)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "copilot")

  return (
    <Fragment>
      <Suspense condition={!products.isLoading} fallback={<Loading />}>
        <Suspense condition={!products.error} fallback={<Error />}>
          <Container>
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
            </Hero>
          </Container>
        </Suspense>
      </Suspense>
    </Fragment>
  )
}
