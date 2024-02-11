"use client"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Suspense from "./suspense"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ExternalLinkIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { uiHost } from "@/constants/api-endpoints"
import Avatar from "./avatar"
import { useDebounce } from "@uidotdev/usehooks"

interface HeaderProps {
  isAuthorized: boolean,
}

export default function Header({ isAuthorized }: HeaderProps) {
  const [isHomePage, setIsHomePage] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [searchString, setSearchString] = useState("")
  const debouncedSearchTerm = useDebounce(searchString, 1000)

  const searchEnabledPathNames = [
    "/dashboard", "/products/datalake", "/products/insights",
    "/products/fabric", "/products/nftstudio", "/products/swap",
    "/dashboard/", "/products/datalake/", "/products/insights/",
    "/products/fabric/", "/products/nftstudio/", "/products/swap/"
  ]

  useEffect(() => {
    setIsHomePage(pathname === "/")
    dispatch("setAppState", { globalSearchString: "" })

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

  useEffect(() => {
    dispatch("setAppState", { globalSearchString: debouncedSearchTerm })
  }, [debouncedSearchTerm])

  return (
    <Fragment>
      <Suspense condition={isAuthorized && !isHomePage} fallback={null}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/dashboard">
              <Navbar.Brand>
                <img alt="" src={`${uiHost}/favicon.ico`} width="30" height="30" className="d-inline-block align-top" />{" "}
                {uiConstants.brandName}
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <i className="fa-solid fa-equals"></i>
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Item><Link href="/workspace">Workspace</Link></Nav.Item>
                <Nav.Item><Link href="/subscription">Subscription</Link></Nav.Item>
                <Nav.Item><Link href="/activity">Activity</Link></Nav.Item>
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.mumbaiFaucetUri}>Fund Wallet<ExternalLinkIcon className="icon-right" /></Link></Nav.Item>
                <Nav.Item className="btn-user-link"><Link href="/account">Account</Link></Nav.Item>
              </Nav>
              <Nav className="ms-auto">
                <Suspense condition={searchEnabledPathNames.includes(pathname)} fallback={null}>
                  <input ref={searchRef} placeholder="Press (Alt + Q) or click here to search" type="text" className="header-search" onChange={(e) => setSearchString(e.target.value)} />
                </Suspense>
                <Avatar email={userState.email} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Suspense>
      <Suspense condition={!isAuthorized || isHomePage} fallback={null}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href="/">
              <Navbar.Brand>
                <img alt="" src={`${uiHost}/favicon.ico`} width="30" height="30" className="d-inline-block align-top" />{" "}
                {uiConstants.brandName}
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle>
              <i className="fa-solid fa-equals"></i>
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Item><Link href="/products">Products</Link></Nav.Item>
                <Nav.Item><Link href="/solutions">Solutions</Link></Nav.Item>
                <Nav.Item><Link href="/docs">Docs</Link></Nav.Item>
                <Nav.Item><Link href="/plans">Plans</Link></Nav.Item>
              </Nav>
              <Nav className="ms-auto">
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.linkedinUri}>Developer</Link></Nav.Item>
                <Nav.Item><Link href="/dashboard">Get Started</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Suspense>
    </Fragment>
  )
}