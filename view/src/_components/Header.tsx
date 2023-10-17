"use client"
import { FC, Fragment, useEffect, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Show from "./Show"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    setIsLoggedIn(accessToken !== null)
    setIsHomePage(pathname === "/")
  }, [pathname])

  return (
    <Fragment>
      <Show when={isLoggedIn && !isHomePage}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/dashboard">
              <Navbar.Brand>Lenstack</Navbar.Brand>
            </Link>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Link href="/subscription"><Navbar.Brand>Subscription</Navbar.Brand></Link>
                <Link href="/usage"><Navbar.Brand>Usage</Navbar.Brand></Link>
                <Link target="_blank" passHref rel="noopener noreferrer" href="https://mumbaifaucet.com/"><Navbar.Brand>Fund Wallet</Navbar.Brand></Link>
                <Link href="/account"><Navbar.Brand>Account</Navbar.Brand></Link>
                <Link href="/"><Navbar.Brand onClick={() => localStorage.clear()}>Sign Out</Navbar.Brand></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
      <Show when={!isLoggedIn || isHomePage}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/">
              <Navbar.Brand>Lenstack</Navbar.Brand>
            </Link>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Link target="_blank" passHref rel="noopener noreferrer" href="https://www.linkedin.com/in/arnhazra/"><Navbar.Brand>Developer</Navbar.Brand></Link>
                <Link href="/dashboard"><Navbar.Brand>Try Free</Navbar.Brand></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
    </Fragment >
  )
}

export default Header