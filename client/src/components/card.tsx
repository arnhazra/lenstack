import { Card as BootstrapCard, Badge, Col } from "react-bootstrap"
import Link from "next/link"

export interface CardInterface {
  headerText: string
  footerText: string
  badgeText: string
  redirectUri: string
  className: string
  isDisabled?: boolean
}

export interface CardProps {
  cardProps: CardInterface
}

export default function Card({ cardProps }: CardProps) {
  return (
    <Col className="mb-4">
      <Link href={cardProps.redirectUri}>
        <BootstrapCard className={`card-${cardProps.className.toLowerCase()}`}>
          <Badge className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2 card-badge">{cardProps.badgeText}</Badge>
          <BootstrapCard.Header className="pb-2 ps-3 card-header">
            <p className="card-header-text pb-2 pt-2">{cardProps.headerText}</p>
          </BootstrapCard.Header>
          <BootstrapCard.Footer className="pt-4 ps-4 card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <p className="smalltext">{cardProps.footerText}</p>
            </div>
          </BootstrapCard.Footer>
        </BootstrapCard>
      </Link>
    </Col>
  )
}