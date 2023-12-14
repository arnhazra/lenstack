"use client"
import { ChangeEvent, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Show from "./show-component"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { BellIcon, GearIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import { uiConstants } from "@/constants/global-constants"
import debounce from "lodash.debounce"
import { GlobalContext } from "@/context/globalstate.provider"
import { useRouter } from "next/navigation"
import { uiHost } from "@/constants/api-endpoints"

interface HeaderProps {
  isAuthorized: boolean,
}

export default function Header({ isAuthorized }: HeaderProps) {
  const [isHomePage, setIsHomePage] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const userInitial = userState.email.slice(0, 2).toUpperCase() ?? "US"
  const searchEnabledPathNames = [
    "/dashboard", "/products/datalake", "/products/insights",
    "/products/fabric", "/products/nftstudio", "/products/swap",
    "/dashboard/", "/products/datalake/", "/products/insights/",
    "/products/fabric/", "/products/nftstudio/", "/products/swap/"
  ]

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
              <Navbar.Brand>
                <img alt="" src={`${uiHost}/favicon.ico`} width="30" height="30" className="d-inline-block align-top" />{" "}
                {uiConstants.brandName}
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignRightIcon className="icon-nav-toggle" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Item><Link href="/workspace">Workspace</Link></Nav.Item>
                <Nav.Item><Link href="/subscription">Subscription</Link></Nav.Item>
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.mumbaiFaucetUri}>Fund Wallet</Link></Nav.Item>
                <Nav.Item className="btn-user-link"><Link href="/account">Account</Link></Nav.Item>
                <Nav.Item className="btn-user-link"><Link href="/activities">Activities</Link></Nav.Item>
              </Nav>
              <Nav className="ms-auto">
                <Show when={searchEnabledPathNames.includes(pathname)}>
                  <input ref={searchRef} placeholder="Press (Alt + Q) or click here to search" type="text" className="header-search" onChange={debouncedChangeHandler} />
                </Show>
                <BellIcon className="icon-navbar" onClick={() => router.push("/activities")} />
                <button className="btn-user" onClick={(): void => router.push("/account")}>{userInitial}</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
      <Show when={!isAuthorized || isHomePage}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/">
              <Navbar.Brand>
                <img alt="" src={`${uiHost}/favicon.ico`} width="30" height="30" className="d-inline-block align-top" />{" "}
                {uiConstants.brandName}
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <TextAlignRightIcon className="icon-nav-toggle" />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.linkedinUri}>Developer</Link></Nav.Item>
                <Nav.Item><Link href="/dashboard">Get Started</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Show>
    </Fragment >
  )
}