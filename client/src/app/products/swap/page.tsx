"use client"
import GenericProductCard from "@/components/genericproductcard.component"
import { GenericProductCardInterface, TokenData } from "@/types/Types"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import useFetch from "@/hooks/useFetch"
import { Badge, Container, Row } from "react-bootstrap"
import { useCallback, useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import Show from "@/components/show.component"
import Loading from "@/components/loading.component"
import GenericHero from "@/components/generichero.component"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const swapTokenConfig = useFetch("swaptokenconfig", endPoints.swapTokenConfig, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "swap" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swap")

  const displayTokens = useCallback(() => {
    const tokensToDisplay = swapTokenConfig?.data?.map((token: TokenData) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swap/token?tokenAddress=${token.tokenContractAddress}`
      }

      return <GenericProductCard key={token.tokenContractAddress} genericProductCardProps={genericProductCardProps} />
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
        <GenericHero>
          <p className="branding">{selectedProduct?.productName}</p>
          <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
          <div className="mb-2">
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
          </div>
        </GenericHero>
        {displayTokens()}
      </Show>
      <Show when={swapTokenConfig.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}
