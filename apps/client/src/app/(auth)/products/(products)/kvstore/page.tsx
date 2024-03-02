"use client"
import { endPoints } from "@/constants/api-endpoints"
import Suspense from "@/components/suspense"
import { Badge, Container, Table } from "react-bootstrap"
import Loading from "@/components/loading"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ReaderIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { useCallback } from "react"

export default function Page() {
  const { prompt } = usePromptContext()
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=kvstore`, HTTPMethods.GET)
  const kvList = useQuery(["kvlist"], `${endPoints.kvstoreReadKvList}`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "kvstore")

  const displayKvs = useCallback(() => {
    const kvsToDisplay = kvList?.data?.kvs?.map((kv: any) => {
      return (
        <tr key={kv._id}>
          <td>{kv.key}</td>
          <td>{kv.value}</td>
        </tr>
      )
    })

    return (
      <tbody>
        {kvsToDisplay}
      </tbody>
    )
  }, [kvList?.data])

  return (
    <Suspense condition={!kvList.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!kvList.error && !products.error} fallback={<Error />}>
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
          <Suspense condition={!!kvList?.data?.kvs && kvList?.data?.kvs.length} fallback={null}>
            <h4 className="text-white">KVs</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              {displayKvs()}
            </Table>
          </Suspense>
        </Container>
      </Suspense>
    </Suspense>
  )
}
