import { Container } from 'react-bootstrap'
import { Fragment, useEffect } from 'react'
import { NextPage } from 'next'
import Constants from '@/constants/appConstants'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {
	const router = useRouter()

	useEffect(() => {
		if (localStorage.hasOwnProperty('accessToken')) {
			router.push('/queryengine')
		}
	}, [])

	return (
		<Fragment>
			<Container>
				<div className='cover'>
					<p className='display-5'>
						{Constants.HomeHeader1}<br />
						{Constants.HomeHeader2}<br />
						{Constants.HomeHeader3}
					</p>
					<p className='lead my-4'>
						{Constants.HomeIntro1} <br />
						{Constants.HomeIntro2} <br />
					</p>
					<Link href='/identity' className='btn'>Get Started<i className='fa-solid fa-circle-arrow-right'></i></Link>
				</div>
			</Container>
		</Fragment>
	)
}

export default HomePage