"use client"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { Badge, Container, Row } from "react-bootstrap"
import { useCallback, useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"

export interface TokenData {
  tokenName: string
  tokenSymbol: string
  tokenContractAddress: string
  vendorContractAddress: string
  tokensPerMatic: number
  description: string
}

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const swapTokenConfig = useQuery(["swaptokenconfig"], `${endPoints.swapTokenConfig}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=swap`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swap")

  const displayTokens = useCallback(() => {
    const tokensToDisplay = swapTokenConfig?.data?.map((token: TokenData) => {
      const cardProps: CardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swap/token?tokenAddress=${token.tokenContractAddress}`
      }

      return <Card key={token.tokenContractAddress} cardProps={cardProps} />
    })

    return (
      <Suspense condition={!!swapTokenConfig?.data?.length} fallback={<h4 className="text-white">No ERC-20 Tokens to display</h4>}>
        <h4 className="text-white">Explore ERC-20 Tokens</h4>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {tokensToDisplay}
        </Row>
      </Suspense>
    )
  }, [swapTokenConfig?.data])

  return (
    <Container>
      <Suspense condition={!swapTokenConfig.isLoading && !products.isLoading} fallback={<Loading />}>
        <Suspense condition={!swapTokenConfig.error && !products.error} fallback={<Error />}>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
          </Hero>
          {displayTokens()}
        </Suspense>
      </Suspense>
    </Container>
  )
}
