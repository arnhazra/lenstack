import { ReactNode } from "react"
import { Col, Container, Row } from "react-bootstrap"

interface CenterGridProps {
  children: ReactNode
}

export default function CenterGrid({ children }: CenterGridProps) {
  return (
    <Container>
      <Row className="justify-content-center" >
        <Col xl={7} lg={8} md={9} sm={9} xs={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
