import { FC, Fragment, useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Show from './Show'

const NavBar: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        setIsLoggedIn(accessToken !== null)
    }, [location.pathname])

    return (
        <Fragment>
            <Show when={isLoggedIn}>
                <Navbar variant='dark' className='navbar' expand='lg' fixed='top'>
                    <Container>
                        <Link to='/dashboard'>
                            <Navbar.Brand>Dashboard</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link to='/pricing'><Navbar.Brand>Pricing</Navbar.Brand></Link>
                                <Link to='/usage'><Navbar.Brand>Usage</Navbar.Brand></Link>
                                <Link to='/wallet'><Navbar.Brand>Wallet</Navbar.Brand></Link>
                                <Link to='/transactions'><Navbar.Brand>Transactions</Navbar.Brand></Link>
                                <Link to='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
            <Show when={!isLoggedIn}>
                <Navbar variant='dark' className='navbar' expand='lg' fixed='top'>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand>Lenstack</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link to='/plans'><Navbar.Brand>Plans</Navbar.Brand></Link>
                                <Link target='_blank' rel='noopener noreferrer' to='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Developer</Navbar.Brand></Link>
                                <Link to='/identity'><Navbar.Brand>Get Started</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
        </Fragment >
    )
}

export default NavBar