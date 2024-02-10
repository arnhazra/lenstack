import { uiConstants } from "@/constants/global-constants"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"

export default function Page() {
  return (
    <Container>
      <div className="text-center">
        <p className="display-6">
          {uiConstants.homeHeader1} {uiConstants.homeHeader2} {uiConstants.brandName}
        </p>
        <p className="display-5 text-muted">
          {uiConstants.homeHeader3}
        </p>
        <p className="lead">
          {uiConstants.homeIntro1}
        </p>
        <p className="lead text-muted">
          {uiConstants.homeIntro2}
        </p>
        <Link href="/dashboard" className="btn btn-primary rounded p-3 ps-4 pe-4">
          <ArrowRightIcon className="icon-left" />Get Started
        </Link>
      </div>
    </Container>
  )
}
