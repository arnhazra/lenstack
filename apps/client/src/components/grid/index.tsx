import { ReactNode } from "react"
import { Row } from "react-bootstrap"

interface GridProps {
  className?: string
  children: ReactNode
}

export default function Grid({ children, className }: GridProps) {
  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4} className={className}>
      {children}
    </Row>
  )
}
