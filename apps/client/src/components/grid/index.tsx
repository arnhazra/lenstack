import { ReactNode } from 'react'
import { Row } from "react-bootstrap"

export default function Grid({ children }: { children: ReactNode }) {
  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4}>
      {children}
    </Row>
  )
}
