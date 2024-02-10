"use client"
import Link from "next/link"
import { Container, Navbar, Nav } from "react-bootstrap"
import { uiConstants } from "@/constants/global-constants"
import { BookmarkIcon } from "@radix-ui/react-icons"
import "../styles/header.style.sass"

export default function Header() {
  return (
    <Navbar variant="light" expand="lg" fixed="top" className="pt-3 pb-3">
      <Container>
        <Link href="/">
          <Navbar.Brand>
            <BookmarkIcon className="icon-large mb-1 me-1" />
            {uiConstants.brandName}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle>
          <i className="fa-solid fa-equals"></i>
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Item><Link href="/plans">Products</Link></Nav.Item>
            <Nav.Item><Link href="/plans">Solutions</Link></Nav.Item>
            <Nav.Item><Link href="/plans">Resources</Link></Nav.Item>
            <Nav.Item><Link href="/plans">Pricing</Link></Nav.Item>
          </Nav>
          <Nav className="ms-auto">
            <Link className="btn btn-secondary" target="_blank" passHref rel="noopener noreferrer" href={uiConstants.linkedinUri}>Developer</Link>
            <Link className="btn btn-primary pt-2" href={"/dashboard"}>Get Started</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}