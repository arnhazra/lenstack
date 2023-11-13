"use client"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import { Container, Row } from "react-bootstrap"
import { GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/GenericProductCard"
import { GlobalContext } from "@/context/globalStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })

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
        {productsToDisplay}
      </Row>
    )
  }, [globalSearchString, products?.data])

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