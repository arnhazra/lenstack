"use client"
import ProductCard from "@/components/productcard-component"
import { ProductCardInterface, TokenData } from "@/types/Types"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/use-fetch"
import { Badge, Col, Container, Row } from "react-bootstrap"
import { useCallback, useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import Show from "@/components/show-component"
import Loading from "@/components/loading-component"
import Hero from "@/components/hero-component"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const swapTokenConfig = useFetch("swaptokenconfig", `${endPoints.swapTokenConfig}?searchQuery=${globalSearchString}`, HTTPMethods.GET)
  const products = useFetch("get-products", `${endPoints.getProductConfig}?searchQuery=swap`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swap")

  const displayTokens = useCallback(() => {
    const tokensToDisplay = swapTokenConfig?.data?.map((token: TokenData) => {
      const productCardProps: ProductCardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swap/token?tokenAddress=${token.tokenContractAddress}`
      }

      return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4" key={token.tokenContractAddress}>
          <ProductCard productCardProps={productCardProps} />
        </Col>
      )
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!swapTokenConfig?.data?.length}>
          <h4 className="text-white">ERC-20 Tokens</h4>
          {tokensToDisplay}
        </Show >
        <Show when={!swapTokenConfig?.data?.length}>
          <h4 className="text-white">No ERC-20 Tokens to display</h4>
        </Show>
      </Row>
    )
  }, [swapTokenConfig?.data])

  return (
    <Container>
      <Show when={!swapTokenConfig.isLoading && !products.isLoading}>
        <Hero>
          <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
          <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
          <div className="mb-2">
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
          </div>
        </Hero>
        {displayTokens()}
      </Show>
      <Show when={swapTokenConfig.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}
