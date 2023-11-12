"use client"
import { ChangeEvent, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Show from "./Show"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { TextAlignLeftIcon } from "@radix-ui/react-icons"
import Constants from "@/constants/appConstants"
import debounce from "lodash.debounce"
import { AppContext } from "@/context/appStateProvider"

interface HeaderProps {
  isAuthorized: boolean,
  onSignOut: () => void
}

export default function Header({ isAuthorized, onSignOut }: HeaderProps) {
  const [isHomePage, setIsHomePage] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    setIsHomePage(pathname === "/")
    dispatch("setGlobalSearchString", "")
    if (searchRef && searchRef.current) {
      searchRef.current.value = ''
    }
  }, [pathname, searchParams])

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch("setGlobalSearchString", event.target.value)
  }

  const debouncedChangeHandler = useMemo(() => debounce(searchChangeHandler, 1000), [])

  return (
    <Fragment>
      <Show when={isAuthorized && !isHomePage}>
        <Navbar variant="dark" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/dashboard">
              <Navbar.Brand>Lenstack</Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignLeftIcon className="icon-nav-toggle" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <input ref={searchRef} placeholder="What are you looking for ?" type="text" className="header-search" onChange={debouncedChangeHandler} />
              </Nav>
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
              <TextAlignLeftIcon className="navbar-nav-toggle" />
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