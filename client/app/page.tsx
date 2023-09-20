"use client"
import { Fragment } from "react"
import Constants from "@/_constants/appConstants"
import Link from "next/link"
import { NextPage } from "next"
import withoutAuth from "@/_utils/withoutAuth"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"

const HomePage: NextPage = () => {
	return (
		<Fragment>
			<Container>
				<div className="cover">
					<p className="display-3">{Constants.HomeHeader1}</p>
					<p className="display-5">{Constants.HomeHeader2}</p>
					<p className="lead my-4">
						{Constants.HomeIntro1} <br />
						{Constants.HomeIntro2}
					</p>
					<Link href="/auth" className="btn">Try Free<ArrowRightIcon className="icon-right" /></Link>
				</div>
			</Container>
		</Fragment>
	)
}

export default withoutAuth(HomePage)