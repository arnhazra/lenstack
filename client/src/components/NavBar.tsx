import { FC, Fragment, useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Show from './Show'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavBar: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        setIsLoggedIn(accessToken !== null)
    }, [router.pathname])

    return (
        <Fragment>
            <Show when={isLoggedIn}>
                <Navbar variant='light' expand='lg' fixed='top'>
                    <Container>
                        <Link href='/dashboard'>
                            <Navbar.Brand>Dashboard</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link href='/apidoc'><Navbar.Brand>API Doc</Navbar.Brand></Link>
                                <Link href='/pricing'><Navbar.Brand>Pricing</Navbar.Brand></Link>
                                <Link href='/usage'><Navbar.Brand>Usage</Navbar.Brand></Link>
                                <Link href='/wallet'><Navbar.Brand>Wallet</Navbar.Brand></Link>
                                <Link href='/transactions'><Navbar.Brand>Transactions</Navbar.Brand></Link>
                                <Link href='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
            <Show when={!isLoggedIn}>
                <Navbar variant='light' expand='lg' fixed='top'>
                    <Container>
                        <Link href='/'>
                            <Navbar.Brand>Lenstack</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link href='/plans'><Navbar.Brand>Plans</Navbar.Brand></Link>
                                <Link target='_blank' passHref rel='noopener noreferrer' href='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Developer</Navbar.Brand></Link>
                                <Link href='/identity'><Navbar.Brand>Get Started</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
        </Fragment >
    )
}

export default NavBar