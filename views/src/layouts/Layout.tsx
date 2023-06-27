import NavBar from '@/components/NavBar'
import { LayoutProps } from '@/types/Types'
import { Fragment, FC } from 'react'
import Show from '@/components/Show'
import Loading from '@/components/Loading'
import useAuth from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'

const Layout: FC<LayoutProps> = ({ children }) => {
	const auth = useAuth()

	return (
		<Fragment>
			<nav className='header'>
				<NavBar />
			</nav>
			<main>
				<Show when={auth.isLoaded}>
					{children}
				</Show>
				<Show when={!auth.isLoaded}>
					<Loading />
				</Show>
				<Toaster position='bottom-center' containerClassName='toaster' />
			</main>
		</Fragment>
	)
}

export default Layout