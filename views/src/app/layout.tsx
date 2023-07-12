"use client"
import axios from 'axios'
import AppStateProvider from '@/context/appStateProvider'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Tilt_Neon } from 'next/font/google'
import NavBar from '@/components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/global.sass'
import '@/styles/navbar.sass'
import '@/styles/button.sass'
import '@/styles/form.sass'
import '@/styles/icons.sass'
import '@/styles/productcard.sass'
import '@/styles/datasetcard.sass'
import '@/styles/sourcecode.sass'
import ReactQueryProvider from '@/utils/ReactQueryProvider'

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Lenstack',
	description: 'Lenstack',
}

axios.interceptors.request.use((request) => {
	if (localStorage.hasOwnProperty('accessToken')) {
		request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	}
	return request
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<title>Lenstack</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
				<meta name='theme-color' content='#ffffff' />
				<meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
				<meta name='description' content='Lenstack' />
				<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css' />
			</head>
			<body className={tiltNeon.className}>
				<ReactQueryProvider>
					<AppStateProvider>
						<nav className={`header`}>
							<NavBar />
						</nav>
						<main className='mt-4'>
							{children}
							<Toaster position='bottom-right' containerClassName='toaster' />
						</main>
					</AppStateProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
