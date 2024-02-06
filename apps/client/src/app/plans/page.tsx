import Header from "@/components/header"
import Pricing from "@/components/pricing"
import { Fragment } from "react"
import { Container } from "react-bootstrap"

export default function Page() {
  return (
    <Fragment>
      <nav className="header">
        <Header isAuthorized={false} />
      </nav>
      <Container>
        <Pricing readonly={false} />
      </Container>
    </Fragment>
  )
}