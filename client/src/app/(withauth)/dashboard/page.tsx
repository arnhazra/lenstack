"use client"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/show"
import Loading from "@/components/loading"
import { Container, Row } from "react-bootstrap"
import Card, { CardInterface } from "@/components/card"
import { GlobalContext } from "@/context/globalstate.provider"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const products = useQuery("get-products", `${endPoints.getProductConfig}?searchQuery=${globalSearchString}`, HTTPMethods.GET)

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const cardProps: CardInterface = {
        badgeText: product.productStatus,
        className: product.productCategory,
        footerText: product.description,
        headerText: `${uiConstants.brandName} ${product.displayName}`,
        redirectUri: `/products/${product.productName}`,
        isDisabled: product.productStatus !== "Available"
      }

      return <Card key={product.productName} cardProps={cardProps} />
    })

    return (
      <Fragment>
        <Show when={!!products?.data?.length}>
          <h4 className="text-white">Explore the experience</h4>
          <Row xs={1} sm={1} md={2} lg={3} xl={4}>
            {productsToDisplay}
          </Row>
        </Show>
        <Show when={!products?.data?.length}>
          <h4 className="text-white">No Products to display</h4>
        </Show>
      </Fragment>
    )
  }, [products?.data])

  return (
    <Fragment>
      <Show when={!products.isLoading}>
        <Container>
          {displayProducts()}
        </Container>
      </Show>
      <Show when={products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}