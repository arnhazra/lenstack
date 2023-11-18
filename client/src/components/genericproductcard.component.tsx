"use client"
import { Card, Col, Badge } from "react-bootstrap"
import { GenericProductCardProps } from "@/types/Types"
import { useRouter } from "next/navigation"

export default function GenericProductCard({ genericProductCardProps }: GenericProductCardProps) {
  const router = useRouter()

  const redirectToProduct = () => {
    if (!genericProductCardProps.isDisabled) {
      router.push(genericProductCardProps.redirectUri)
    }
  }

  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
      <Card onClick={redirectToProduct} className={`product-card-${genericProductCardProps.className.toLowerCase()}`}>
        <Badge bg="dark" className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{genericProductCardProps.badgeText}</Badge>
        <Card.Header className="pb-2 ps-4 product-card-header">
          <p className="branding pb-2 pt-2">{genericProductCardProps.headerText}</p>
        </Card.Header>
        <Card.Footer className="pt-4 ps-4 product-card-footer mb-1">
          <div className="d-flex justify-content-between align-items-center">
            <p className="smalltext">{genericProductCardProps.footerText}</p>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  )
}