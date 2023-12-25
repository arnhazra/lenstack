import { ReactNode } from "react"
import { Col, Row } from "react-bootstrap"

interface InfoPanelInterface {
  infoIcon: ReactNode
  infoName: string
  infoValue: string
}

export default function InfoPanel({ infoIcon, infoName, infoValue }: InfoPanelInterface) {
  return (
    <Row className="mt-3 mb-2">
      <Col className="categorycol">
        {infoIcon}
      </Col>
      <Col>
        <p className="boxcategory-key">{infoName}</p>
        <div className="boxcategory-value">
          {infoValue}
        </div>
      </Col>
    </Row>
  )
}