"use client"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import { TierCardComponent } from "@/components/tiercard"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Github } from "lucide-react"
import LoadingComponent from "@/components/loading"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const pricing = useQuery(["subscription"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=&category=`, HTTPMethods.GET)
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
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

  const renderPricing = pricing?.data?.slice(0, 2)?.map((pricing: any) => {
    return (
      <TierCardComponent
        key={pricing.planName}
        className={cn(pricing.length === 1 && "xl-col-span-2 xl:col-start-2")}
        handleClick={(): void => router.push("/subscription")}
        {...pricing}
      />
    )
  })

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-2" key={product?._id}>
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div dangerouslySetInnerHTML={{ __html: product?.productIcon }} style={{ zoom: "150%" }}></div>
          <div className="space-y-2">
            <h3 className="font-bold">{uiConstants.brandName} {product?.displayName}</h3>
            <p className="text-sm text-slate-600">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    )
  })

  const renderSolutions = solutions?.data?.map((solution: any) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-2" key={solution?._id}>
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div dangerouslySetInnerHTML={{ __html: solution?.solutionIcon }} style={{ zoom: "150%" }}></div>
          <div className="space-y-2">
            <h3 className="font-bold">{solution?.solutionName}</h3>
            <p className="text-sm text-slate-600">
              {solution?.description}
            </p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <Suspense condition={!pricing.isLoading && !products.isLoading && !solutions.isLoading && !isLoading} fallback={<LoadingComponent />}>
      <div className="min-h-screen w-full bg-white">
        <section id="hero" className="hero space-y-6 pb-8 pt-8 md:pt-16 lg:pt-24 lg:py-40">
          <div className="container flex flex-col gap-4">
            <Link href="" rel="noopener noreferrer">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                Limitless Innovation
              </Badge>
            </Link>
            <h1 className="font-heading text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-tight">
              {uiConstants.homeHeader}
            </h1>
            <h1 className="font-heading text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl -mt-2">
              {uiConstants.brandName}
            </h1>
            <p className="leading-normal text-white text-xs md:text-md lg:text-lg">
              {uiConstants.homeIntro}<br />
              {uiConstants.homeIntro2}
            </p>
            <div className="space-x-4 space-y-4">
              <Button variant="secondary" onClick={(): void => router.push("/dashboard")}>
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section id="research" className="mt-8 container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Research
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
              Find solutions for putting your ideas into action.
              Solve your business problems with proven combinations of {uiConstants.brandName} services,
              as well as sample architectures and documentation.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            {renderSolutions}
          </div>
        </section>
        <section id="opensource" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Open Source
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
              {uiConstants.brandName} is open source and powered by open source software. <br />{" "}
              The code is available on{" "}
              <Link
                href={uiConstants.githubRepoUri}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                GitHub
              </Link>
              .{" "}
            </p>
            <Link
              href={uiConstants.githubRepoUri}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <Github />
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {""} stars on GitHub
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section id="products" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Products
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
              Explore products for bringing your vision to life.
              Access all products for different needs with just a free account.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            {renderProducts}
          </div>
        </section>
        <section id="pricing" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
              Choose an {uiConstants.brandName} subscription plan that's right for you.
              Downgrade, upgrade or cancel any time.{" "}
              {uiConstants.brandName} offers a variety of plans to meet your requirements.
            </p>
          </div>
          <div className="container flex flex-col gap-6 py-8 md:max-w-[55rem] md:py-12">
            {renderPricing}
          </div>
          <div className="mx-auto flex-col items-center justify-center text-center">
            <Button variant="secondary" onClick={(): void => router.push("/subscription")}>Explore All Plans</Button>
          </div>
        </section>
      </div>
      <Footer />
    </Suspense>
  )
}