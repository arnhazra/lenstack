import { uiConstants } from "@/constants/global-constants"
import Link from "next/link"
import { CubeIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Header from "@/components/header-component"

export default function Page() {
  return (
    <Container>
      <nav className="header">
        <Header isAuthorized={false} />
      </nav>
      <div className="cover">
        <p className="display-4">
          {uiConstants.homeHeader1}<br />
          {uiConstants.homeHeader2}
        </p>
        <p className="lead my-4">
          {uiConstants.homeIntro1} <br />
          {uiConstants.homeIntro2} <br />
          {uiConstants.homeIntro3} <br />
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          <CubeIcon className="icon-left" />
          Try for free
        </Link>
      </div>
    </Container>
  )
}
