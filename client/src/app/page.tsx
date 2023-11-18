"use client"
import Constants from "@/constants/global.constants"
import Link from "next/link"
import { CubeIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Show from "@/components/show.component"

export default function Page() {
  return (
    <Container>
      <div className="cover">
        <p className="display-4">
          {Constants.HomeHeader1}<br />
          {Constants.HomeHeader2}
        </p>
        <p className="lead my-4">
          {Constants.HomeIntro1} <br />
          {Constants.HomeIntro2} <br />
          {Constants.HomeIntro3} <br />
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
        <Link passHref target="_blank" rel="noopener noreferrer" href={Constants.LinkedinUri} className="btn"><ExternalLinkIcon className="icon-left" />Contact</Link>
      </div>
    </Container>
  )
}
