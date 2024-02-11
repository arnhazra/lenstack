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
import Header from "@/components/header"
import ProductCard, { ProductCardInterface } from "@/components/product-card"
import Link from "next/link"

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const productCardProps: ProductCardInterface = {
        footerText: product.description,
        headerText: `${uiConstants.brandName} ${product.displayName}`,
      }

      return (
        <Col className="mb-4">
          <Link href={`/products/${product.productName}`}>
            <ProductCard key={product.productName} productCardProps={productCardProps} />
          </Link>
        </Col>
      )
    })

    return (
      <Suspense condition={!!products?.data?.length} fallback={<h4 className="text-white">No Products to display</h4>}>
        <h4 className="text-white">Explore products within {uiConstants.brandName}</h4>
        <Row xs={1} sm={2} md={2} lg={3} xl={4}>
          {productsToDisplay}
        </Row>
      </Suspense>
    )
  }, [products?.data])

  return (
    <Suspense condition={!products.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error} fallback={<Error />}>
        <nav className="header">
          <Header isAuthorized={false} />
        </nav>
        <Container>
          {displayProducts()}
        </Container>
      </Suspense>
    </Suspense>
  )
}