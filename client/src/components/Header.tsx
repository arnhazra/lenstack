"use client"
import { Fragment, useEffect, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Show from "./Show"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { TextAlignLeftIcon } from "@radix-ui/react-icons"
import Constants from "@/constants/appConstants"

interface HeaderProps {
  isAuthorized: boolean,
  onSignOut: () => void
}

export default function Header({ isAuthorized, onSignOut }: HeaderProps) {
  const [isHomePage, setIsHomePage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsHomePage(pathname === "/")
  }, [pathname])

  return (
    <Fragment>
      <Show when={isAuthorized && !isHomePage}>
        <Navbar variant="dark" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/dashboard">
              <Navbar.Brand>Lenstack</Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignLeftIcon className="icon-large" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Item><Link href="/workspace">Workspace</Link></Nav.Item>
                <Nav.Item><Link href="/subscription">Subscription</Link></Nav.Item>
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={Constants.MumbaiFaucetUri}>Fund Wallet</Link></Nav.Item>
                <Nav.Item><Link href="/account">Account</Link></Nav.Item>
                <Nav.Item onClick={onSignOut}>Sign Out</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
      <Show when={!isAuthorized || isHomePage}>
        <Navbar variant="dark" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/">
              <Navbar.Brand>Lenstack</Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignLeftIcon className="icon-large" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={Constants.LinkedinUri}>Developer</Link></Nav.Item>
                <Nav.Item><Link href="/dashboard">Get Started</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
    </Fragment >
  )
}