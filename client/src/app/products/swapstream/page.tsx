"use client"
import GenericProductCard from "@/components/GenericProductCard"
import { GenericProductCardInterface, TokenData } from "@/types/Types"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import { Badge, Container, Row } from "react-bootstrap"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.swapstreamTokenConfigEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: "swapstream" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swapstream")

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
    <Container>
      <div className="generichero p-4">
        <p className="branding">{selectedProduct?.productName}</p>
        <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
        <div className="mb-2">
          <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
          <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
        </div>
      </div>
      <h4 className="text-white">ERC-20 Tokens</h4>
      <Row>
        {tokensToDisplay}
      </Row>
    </Container>
  )
}
