"use client"
import TokenCard from "@/_components/TokenCard"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { TokenData } from "@/_types/Types"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.getSwapstreamTokenConfig, HTTPMethods.POST)

  return (
    <Container>
      <h4 className="dashboard-header">Start Trading your tokens from here !</h4>
      <Row>
        {swapstreamTokenConfig?.data?.map((token: TokenData) => <TokenCard key={token.tokenContractAddress} token={token} />)}
      </Row>
    </Container>
  )
}
