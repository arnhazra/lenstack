import { Card, Badge, Col } from "react-bootstrap"
import Link from "next/link"

export interface ProductCardInterface {
  headerText: string
  footerText: string
  badgeText: string
  redirectUri: string
  className: string
  isDisabled?: boolean
}

export interface ProductCardProps {
  productCardProps: ProductCardInterface
}

export default function ProductCard({ productCardProps }: ProductCardProps) {
  return (
    <Col className="mb-4" key={productCardProps.redirectUri}>
      <Link href={productCardProps.redirectUri}>
        <Card className={`product-card-${productCardProps.className.toLowerCase()}`}>
          <Badge bg="light" className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{productCardProps.badgeText}</Badge>
          <Card.Header className="pb-2 ps-4 product-card-header">
            <p className="product-card-header-text pb-2 pt-2">{productCardProps.headerText}</p>
          </Card.Header>
          <Card.Footer className="pt-4 ps-4 product-card-footer mb-1">
            <div className="d-flex justify-content-between align-items-center">
              <p className="smalltext">{productCardProps.footerText}</p>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}