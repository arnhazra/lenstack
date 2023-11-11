"use client"
import { Card, Col, Badge } from "react-bootstrap"
import { GenericAppCardProps } from "@/_types/Types"
import { useRouter } from "next/navigation"

export default function GenericAppCard({ genericAppCardProps }: GenericAppCardProps) {
  const router = useRouter()

  const redirectToApp = () => {
    router.push(genericAppCardProps.redirectUri)
  }

  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
      <Card onClick={redirectToApp} className={`app-card-${genericAppCardProps.className.toLowerCase()}`}>
        <Badge bg="dark" className="position-absolute mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{genericAppCardProps.badgeText}</Badge>
        <Card.Header className="pb-2 ps-4 app-card-header">
          <p className="branding app-name pb-2 pt-2">{genericAppCardProps.headerText}</p>
        </Card.Header>
        <Card.Footer className="pt-4 ps-4 app-card-footer mb-1">
          <div className="d-flex justify-content-between align-items-center">
            <p className="smalltext">{genericAppCardProps.footerText}</p>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  )
}