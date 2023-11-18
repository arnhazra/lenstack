"use client"
import { Card, Col, Badge } from "react-bootstrap"
import { ProductCardProps } from "@/types/Types"
import { useRouter } from "next/navigation"

export default function ProductCard({ productCardProps }: ProductCardProps) {
  const router = useRouter()

  const redirectToProduct = () => {
    if (!productCardProps.isDisabled) {
      router.push(productCardProps.redirectUri)
    }
  }

  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
      <Card onClick={redirectToProduct} className={`product-card-${productCardProps.className.toLowerCase()}`}>
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
    </Col>
  )
}