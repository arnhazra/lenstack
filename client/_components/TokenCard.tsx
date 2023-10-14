"use client"
import { FC } from "react"
import { Badge, Card, Col } from "react-bootstrap"
import { TokenCardProps } from "@/_types/Types"
import Link from "next/link"

const TokenCard: FC<TokenCardProps> = ({ token }) => {
  return (
    <Col xs={6} sm={6} md={4} lg={4} xl={3} className="mb-4">
      <Link href={`/apps/swapstream/token?tokenAddress=${token.tokenContractAddress}`}>
        <Card className="token-card-all" title={token.tokenName}>
          <Badge bg="dark" pill className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{token.tokensPerMatic} Tokens/MATIC</Badge>
          <Card.Header className="pb-2 ps-4 app-card-header">
            <p className="branding app-name pb-2 ps-4">{token.tokenSymbol}</p>
          </Card.Header>
          <Card.Footer className="pt-4 ps-4 app-card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <p className="smalltext">{token.description}</p>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}

export default TokenCard