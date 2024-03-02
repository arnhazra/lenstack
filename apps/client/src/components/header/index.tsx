"use client"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Suspense from "../suspense"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { uiHost } from "@/constants/api-endpoints"
import { useDebounce } from "@uidotdev/usehooks"
import "./style.sass"

export default function Header() {
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [searchString, setSearchString] = useState("")
  const userInitial = userState.email.slice(0, 2).toUpperCase() ?? "US"
  const debouncedSearchTerm = useDebounce(searchString, 1000)
  const router = useRouter()

  const searchEnabledPathNames = [
    "/products", "/products/dataexchange", "/products/nftstudio", "/products/swap",
    "/products/", "/products/dataexchange/", "/products/nftstudio/", "/products/swap/"
  ]

  useEffect(() => {
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
      <Suspense condition={userState.isAuthorized} fallback={null}>
        <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
          <Container>
            <Link href={`/products?workspaceId=${userState.selectedWorkspaceId}`}>
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
                <Nav.Item><Link href="/subscription/usage">Usage</Link></Nav.Item>
                <Nav.Item><Link href="/subscription/plans">Plans</Link></Nav.Item>
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.mumbaiFaucetUri}>Fund Wallet<ExternalLinkIcon className="icon-right" /></Link></Nav.Item>
                <Nav.Item className="btn-user-link"><Link href="/account">Account</Link></Nav.Item>
              </Nav>
              <Nav className="ms-auto">
                <Suspense condition={searchEnabledPathNames.includes(pathname)} fallback={null}>
                  <input ref={searchRef} placeholder="Press (Alt + Q) or click here to search" type="text" className="header-search" onChange={(e) => setSearchString(e.target.value)} />
                </Suspense>
                <button className="btn-user" onClick={(): void => router.push("/account")}>{userInitial}</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Suspense>
      <Suspense condition={!userState.isAuthorized} fallback={null}>
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
                <Nav.Item><Link href="/exploreproducts">Explore Products</Link></Nav.Item>
                <Nav.Item><Link href="/plans">Plans</Link></Nav.Item>
                <Nav.Item><Link target="_blank" passHref rel="noopener noreferrer" href={uiConstants.linkedinUri}>Developer<ExternalLinkIcon className="icon-right" /></Link></Nav.Item>
              </Nav>
              <Nav className="ms-auto">
                <Link className="nav-btn ps-4 pe-4" href="/products">Get Started</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Suspense>
    </Fragment>
  )
}