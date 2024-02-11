"use client"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useCallback, useContext } from "react"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import { Col, Container, Row } from "react-bootstrap"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { GenericCard, GenericCardProps } from "@/components/card"
import Link from "next/link"
import Grid from "@/components/grid"

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const productCardProps: GenericCardProps = {
        header: `${uiConstants.brandName} ${product.displayName}`,
        footer: <p className="muted-text">{product.description}</p>,
      }

      return (
        <Col key={product.productName} className="mb-3">
          <Link href={`/products/${product.productName}`}>
            <GenericCard {...productCardProps} />
          </Link>
        </Col>
      )
    })

    return (
      <Suspense condition={!!products?.data?.length} fallback={<h4 className="text-white">No Products to display</h4>}>
        <h4 className="text-white">Explore unified experience</h4>
        <Grid>
          {productsToDisplay}
        </Grid>
      </Suspense>
    )
  }, [products?.data])

  return (
    <Suspense condition={!products.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error} fallback={<Error />}>
        <Container>
          {displayProducts()}
        </Container>
      </Suspense>
    </Suspense>
  )
}