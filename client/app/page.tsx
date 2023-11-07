"use client"
import Constants from "@/_constants/appConstants"
import Link from "next/link"
import { CubeIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Show from "@/_components/Show"

export default function Page() {
  return (
    <Container>
      <div className="hero">
        <p className="display-1 mt-4 pt-4">
          {Constants.HomeHeader1}
        </p>
        <p className="display-5">
          {Constants.HomeHeader2}
        </p>
        <p className="lead my-4">
          {Constants.HomeIntro1} <br />
          {Constants.HomeIntro2} <br />
        </p>
        <Link href="/dashboard" className="btn">
          <CubeIcon className="icon-left" />
          <Show when={!!localStorage.getItem("accessToken")}>
            Go to dashboard
          </Show>
          <Show when={!localStorage.getItem("accessToken")}>
            Try for free
          </Show>
        </Link>
        <Link href={Constants.LinkedinUri} className="btn">
          <ExternalLinkIcon className="icon-left" />
          Contact
        </Link>
      </div>
    </Container>
  )
}
