"use client"
import GenericProductCard from "@/components/GenericProductCard"
import { GenericProductCardInterface, TokenData } from "@/types/Types"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import { Badge, Container, Row } from "react-bootstrap"
import { useCallback, useContext } from "react"
import { GlobalContext } from "@/context/globalStateProvider"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import GenericHero from "@/components/GenericHero"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.swapstreamTokenConfigEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: "swapstream" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swapstream")

  const displayTokens = useCallback(() => {
    const tokensToDisplay = swapstreamTokenConfig?.data?.map((token: TokenData) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swapstream/token?tokenAddress=${token.tokenContractAddress}`
      }

      return <GenericProductCard key={token.tokenContractAddress} genericProductCardProps={genericProductCardProps} />
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!swapstreamTokenConfig?.data?.length}>
          <h4 className="text-white">ERC-20 Tokens</h4>
          {tokensToDisplay}
        </Show >
        <Show when={!swapstreamTokenConfig?.data?.length}>
          <h4 className="text-white">No ERC-20 Tokens to display</h4>
        </Show>
      </Row>
    )
  }, [swapstreamTokenConfig?.data])

  return (
    <Container>
      <Show when={!swapstreamTokenConfig.isLoading && !products.isLoading}>
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
      <Show when={swapstreamTokenConfig.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}
