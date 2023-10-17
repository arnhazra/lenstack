"use client"
import { Fragment } from "react"
import Constants from "@/_constants/appConstants"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Show from "@/_components/Show"

export default function Page() {
  return (
    <Fragment>
      <Container>
        <div className="cover">
          <p className="display-5">
            {Constants.HomeHeader1}<br />
            {Constants.HomeHeader2}<br />
          </p>
          <p className="lead my-4">
            {Constants.HomeIntro1} <br />
            {Constants.HomeIntro2} <br />
            {Constants.HomeIntro3} <br />
          </p>
          <Link href="/dashboard" className="btn">
            <Show when={!!localStorage.getItem("accessToken")}>
              Go to dashboard
            </Show>
            <Show when={!localStorage.getItem("accessToken")}>
              Try for free
            </Show>
            <ArrowRightIcon className="icon-right" /></Link>
        </div>
      </Container>
    </Fragment>
  )
}
