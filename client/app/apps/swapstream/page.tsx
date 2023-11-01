"use client"
import GenericAppCard from "@/_components/GenericAppCard"
import { GenericAppCardInterface, TokenData } from "@/_types/Types"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.swapstreamTokenConfigEndpoint, HTTPMethods.POST)

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
      <h4 className="text-white">Start Trading your tokens from here !</h4>
      <Row>
        {tokensToDisplay}
      </Row>
    </Container>
  )
}
