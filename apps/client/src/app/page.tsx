"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import Link from "next/link"
import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons"
import { Container } from "react-bootstrap"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/dashboard")
    }

    else {
      setIsLoading(false)
    }
  }, [])

  return (
    <Suspense condition={!isLoading} fallback={<Loading />}>
      <Container>
        <div className="cover">
          <p className="display-3">
            {uiConstants.homeHeader1}<br />
            {uiConstants.homeHeader2} {uiConstants.brandName}<br />
          </p>
          <p className="lead my-4">
            {uiConstants.homeIntro1} <br />
            {uiConstants.homeIntro2} <br />
          </p>
          <Link href="/dashboard" className="btn btn-primary">
            Get Started<ArrowRightIcon className="icon-right" />
          </Link>
          <Link href="/products" className="btn btn-secondary">
            <CubeIcon className="icon-left" />Explore Products
          </Link>
        </div>
      </Container>
    </Suspense>
  )
}
