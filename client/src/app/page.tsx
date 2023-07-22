"use client"
import { Fragment } from 'react'
import Constants from '@/constants/appConstants'
import Link from 'next/link'
import { NextPage } from 'next'
import withoutAuth from '@/utils/withoutAuth'
import ContainerComp from '@/components/ContainerComp'

const HomePage: NextPage = () => {
	return (
		<Fragment>
			<ContainerComp>
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
					<Link href='/auth' className='btn'>Start Free<i className='fa-solid fa-circle-arrow-right'></i></Link>
				</div>
			</ContainerComp>
		</Fragment>
	)
}

export default withoutAuth(HomePage)