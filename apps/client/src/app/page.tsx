import { uiConstants } from "@/constants/global-constants"
import Link from "next/link"
import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Header from "@/components/header"

export default function Page() {
  return (
    <Container>
      <nav className="header">
        <Header isAuthorized={false} />
      </nav>
      <div className="cover">
        <p className="display-2">
          {uiConstants.homeHeader1}<br />
          {uiConstants.homeHeader2} {uiConstants.brandName}<br />
        </p>
        <p className="lead my-4">
          {uiConstants.homeIntro1} <br />
          {uiConstants.homeIntro2} <br />
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Get Started<ArrowRightIcon className="icon-right" />
        </Link>
        <Link href="/products" className="btn btn-secondary">
          <CubeIcon className="icon-left" />Explore Products
        </Link>
      </div>
    </Container>
  )
}
