import { uiConstants } from "@/constants/global-constants"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Header from "@/components/header"

export default function Page() {
  return (
    <Container>
      <nav className="header">
        <Header isAuthorized={false} />
      </nav>
      <div className="cover">
        <p className="display-5">
          {uiConstants.homeHeader1}<br />
          {uiConstants.homeHeader2}<br />
          {uiConstants.homeHeader3}<br />
        </p>
        <p className="lead my-4">
          {uiConstants.homeIntro1} <br />
          {uiConstants.homeIntro2} <br />
          {uiConstants.homeIntro3} <br />
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Get Started<ArrowRightIcon className="icon-right" />
        </Link>
      </div>
    </Container>
  )
}
