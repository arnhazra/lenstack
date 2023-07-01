import NavBar from '@/components/NavBar'
import { LayoutProps } from '@/types/Types'
import { Fragment, FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { Tilt_Neon } from 'next/font/google'

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })

const AppLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<Fragment>
			<nav className={`${tiltNeon.className} header`}>
				<NavBar />
			</nav>
			<main className={`${tiltNeon.className} mt-4`}>
				{children}
				<Toaster position='bottom-right' containerClassName='toaster' />
			</main>
		</Fragment >
	)
}

export default AppLayout