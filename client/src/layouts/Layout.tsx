import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/NavBar'

const Layout = () => {
	return (
		<Fragment>
			<NavBar />
			<Toaster position='bottom-center' containerClassName='toaster' />
			<Outlet />
		</Fragment>
	)
}

export default Layout