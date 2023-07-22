"use client"
import { FC, Fragment, useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Show from './Show'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavBar: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        setIsLoggedIn(accessToken !== null)
    }, [pathname])

    return (
        <Fragment>
            <Show when={isLoggedIn}>
                <Navbar variant='dark' expand='lg' fixed='top' className='pt-3 pb-3'>
                    <Container>
                        <Link href='/dashboard'>
                            <Navbar.Brand>Dashboard</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link href='/apireference'><Navbar.Brand>API Reference</Navbar.Brand></Link>
                                <Link href='/subscribe'><Navbar.Brand>Subscribe</Navbar.Brand></Link>
                                <Link href='/usage'><Navbar.Brand>Usage</Navbar.Brand></Link>
                                <Link href='/transactions'><Navbar.Brand>Transactions</Navbar.Brand></Link>
                                <Link href='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
            <Show when={!isLoggedIn}>
                <Navbar variant='dark' expand='lg' fixed='top' className='pt-3 pb-3'>
                    <Container>
                        <Link href='/'>
                            <Navbar.Brand>Lenstack</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link href='/pricing'><Navbar.Brand>Pricing</Navbar.Brand></Link>
                                <Link target='_blank' passHref rel='noopener noreferrer' href='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Developer</Navbar.Brand></Link>
                                <Link href='/auth'><Navbar.Brand>Start Free</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
        </Fragment >
    )
}

export default NavBar