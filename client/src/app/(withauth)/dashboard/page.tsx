"use client"
import useFetch from "@/hooks/use-fetch"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/show-component"
import Loading from "@/components/loading-component"
import { Container, Row } from "react-bootstrap"
import { ProductCardInterface } from "@/types/Types"
import ProductCard from "@/components/productcard-component"
import { GlobalContext } from "@/context/globalstate.provider"
import Error from "@/components/error-component"
import { uiConstants } from "@/constants/global-constants"
import SubHeader from "@/components/subheader-component"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: globalSearchString })

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: product.productStatus,
        className: product.productCategory,
        footerText: product.description,
        headerText: `${uiConstants.brandName} ${product.displayName}`,
        redirectUri: `/products/${product.productName}`,
        isDisabled: product.productStatus !== "Available"
      }

      return <ProductCard key={product.productName} productCardProps={productCardProps} />
    })

    return (
      <Row className="mb-4">
        <Show when={!!products?.data?.length}>
          {productsToDisplay}
        </Show>
        <Show when={!products?.data?.length}>
          <Error customMessage="No Products to display" />
        </Show>
      </Row>
    )
  }, [products?.data])

  return (
    <Fragment>
      <Show when={!products.isLoading}>
        <SubHeader>
          <h4 className="text-white">Explore the Experience</h4>
        </SubHeader>
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