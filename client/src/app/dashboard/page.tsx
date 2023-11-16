"use client"
import useFetch from "@/hooks/useFetch"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/show.component"
import Loading from "@/components/loading.component"
import { Container, Row } from "react-bootstrap"
import { GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/genericproductcard.component"
import { GlobalContext } from "@/context/globalStateProvider"
import Error from "@/components/error.component"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: globalSearchString })

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: product.productStatus,
        className: product.productCategory,
        footerText: product.description,
        headerText: `${product.productName}`,
        redirectUri: `/products/${product.productName}`
      }

      return <GenericProductCard key={product.productName} genericProductCardProps={genericProductCardProps} />
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
        <Container>
          <h4 className="text-white">Lenstack Services</h4>
          {displayProducts()}
        </Container>
      </Show>
      <Show when={products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}