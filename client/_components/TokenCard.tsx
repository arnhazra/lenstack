"use client"
import { FC } from "react"
import { Card, Col } from "react-bootstrap"
import { TokenCardProps } from "@/_types/Types"
import Link from "next/link"

const TokenCard: FC<TokenCardProps> = ({ token }) => {
  return (
    <Col xs={6} sm={6} md={4} lg={4} xl={3} className="mb-4">
      <Link href={`/apps/swapstream/token?tokenAddress=${token.tokenContractAddress}`}>
        <Card className="token-card">
          <Card.Header className="pt-3 token-card-header">
            <div className={`${token.tokenSymbol?.toLowerCase()}Container pt-4`} />
          </Card.Header>
          <Card.Footer className={`pt-4 pb-2 ps-4 ${token.tokenSymbol?.toLowerCase()}Color token-card-footer`}>
            <div className="nameContainer">
              <p>{token.tokenName}</p>
            </div>
            <p className="category">{token.tokenSymbol}</p>
            <p className="category">{token.tokensPerMatic} Tokens/MATIC</p>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}

export default TokenCard