"use client"
import GenericAppCard from "@/_components/GenericAppCard"
import { GenericAppCardInterface, TokenData } from "@/_types/Types"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { Badge, Container, Row } from "react-bootstrap"

export default function Page() {
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.swapstreamTokenConfigEndpoint, HTTPMethods.POST)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "swapstream"
  })

  const tokensToDisplay = swapstreamTokenConfig?.data?.map((token: TokenData) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
      className: "swapstream",
      headerText: token.tokenName,
      footerText: token.description,
      redirectUri: `/apps/swapstream/token?tokenAddress=${token.tokenContractAddress}`
    }

    return <GenericAppCard key={token.tokenContractAddress} genericAppCardProps={genericAppCardProps} />
  })

  return (
    <Container>
      <div className="jumbotron p-4">
        <p className="branding">{selectedApp?.appName}</p>
        <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
        <div className="mb-2">
          <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.dbRegion}</Badge>
          <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
        </div>
      </div>
      <h4 className="text-white">ERC-20 Tokens</h4>
      <Row>
        {tokensToDisplay}
      </Row>
    </Container>
  )
}
