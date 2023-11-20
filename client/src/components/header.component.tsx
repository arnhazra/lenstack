"use client"
import { ChangeEvent, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Show from "./show.component"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { TextAlignLeftIcon } from "@radix-ui/react-icons"
import Constants from "@/constants/global.constants"
import debounce from "lodash.debounce"
import { GlobalContext } from "@/context/globalstate.provider"

interface HeaderProps {
  isAuthorized: boolean,
  onSignOut: () => void
}

export default function Header({ isAuthorized, onSignOut }: HeaderProps) {
  const [isHomePage, setIsHomePage] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, dispatch] = useContext(GlobalContext)
  const searchEnabledPathNames = ["/dashboard", "/products/datalake", "/products/insights", "/products/fabric", "/products/nftstudio", "/products/swap",
    "/dashboard/", "/products/datalake/", "/products/insights/", "/products/fabric/", "/products/nftstudio/", "/products/swap/"]

  useEffect(() => {
    setIsHomePage(pathname === "/")
    dispatch("setGlobalSearchString", "")

    if (searchRef && searchRef.current) {
      searchRef.current.value = ""
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "q" && searchRef.current) {
        event.preventDefault()
        searchRef.current.focus()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [pathname, searchParams])

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch("setGlobalSearchString", event.target.value.toLowerCase())
  }

  const debouncedChangeHandler = useMemo(() => debounce(searchChangeHandler, 1000), [])

  return (
    <Fragment>
      <Show when={isAuthorized && !isHomePage}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/dashboard">
              <Navbar.Brand>{Constants.BrandName}</Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignLeftIcon className="icon-nav-toggle" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Show when={searchEnabledPathNames.includes(pathname)}>
                <Nav className="ms-auto">
                  <input ref={searchRef} placeholder="What are you looking for ? (Alt + Q)" type="text" className="header-search" onChange={debouncedChangeHandler} />
                </Nav>
              </Show>
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
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/">
              <Navbar.Brand>{Constants.BrandName}</Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignLeftIcon className="icon-nav-toggle" />
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