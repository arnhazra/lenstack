"use client"
import { endPoints } from "@/constants/api-endpoints"
import Suspense from "@/components/suspense"
import { Badge, Container, Table } from "react-bootstrap"
import SkeletonLoading from "@/components/skeleton"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { BookIcon } from "lucide-react"
import Link from "next/link"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { format } from "date-fns"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=analytics`, HTTPMethods.GET)
  const analytics = useQuery(["analytics"], endPoints.analyticsView, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "analytics")

  const renderAnalytics = analytics?.data?.analytics?.map((ant: any) => (
    <tr key={ant._id}>
      <td>{ant.component}</td>
      <td>{ant.event}</td>
      <td>{ant.info}</td>
      <td>{ant.statusCode}</td>
      <td>{format(new Date(ant.createdAt), "MMM, do yyyy, h:mm a")}</td>
    </tr>
  ))

  return (
    <Suspense condition={!analytics.isLoading && !products.isLoading} fallback={<SkeletonLoading />}>
      <Suspense condition={!analytics.error && !products.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="text-muted mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-secondary">
              <BookIcon className="icon-left" />API Reference
            </Link>
          </Hero>
          <Suspense condition={!!analytics?.data?.analytics && analytics?.data?.analytics.length} fallback={null}>
            <h4 className="text-white">Analytics</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Event</th>
                  <th>Info</th>
                  <th>Status Code</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {renderAnalytics}
              </tbody>
            </Table>
          </Suspense>
        </Container>
      </Suspense>
    </Suspense>
  )
}
