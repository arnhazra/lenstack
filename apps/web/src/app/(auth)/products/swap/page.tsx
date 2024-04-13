"use client"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { Badge, Col, Container } from "react-bootstrap"
import { Fragment, useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { GenericCard, GenericCardProps } from "@/components/card"
import Link from "next/link"
import Grid from "@/components/grid"

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

  const tokensToDisplay = swapTokenConfig?.data?.map((token: TokenData) => {
    const tokenCardProps: GenericCardProps = {
      header: token.tokenName,
      footer: <Fragment>
        <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">ERC-20</Badge>
        <p className="text-muted">{token.description}</p>
      </Fragment>
    }

    return (
      <Col key={token.tokenContractAddress} className="mb-3">
        <Link href={`/products/swap/token?tokenAddress=${token.tokenContractAddress}`}>
          <GenericCard {...tokenCardProps} />
        </Link>
      </Col>
    )
  })

  return (
    <Container>
      <Suspense condition={!swapTokenConfig.isLoading && !products.isLoading} fallback={<Loading />}>
        <Suspense condition={!swapTokenConfig.error && !products.error} fallback={<Error />}>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="text-muted mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
          </Hero>
          <Suspense condition={!!swapTokenConfig?.data?.length} fallback={<h4 className="text-white">No ERC-20 Tokens to display</h4>}>
            <h4 className="text-white">Explore ERC-20 Tokens</h4>
            <Grid>
              {tokensToDisplay}
            </Grid>
          </Suspense>
        </Suspense>
      </Suspense>
    </Container>
  )
}
