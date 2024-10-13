"use client"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { brandName, uiConstants } from "@/constants/global-constants"
import { endPoints } from "@/constants/api-endpoints"
import { CheckCircle2, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import { Pricing, Product, Solution } from "@/types/Types"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"

export default function Page() {
  const pricing = useQuery(["pricing"], endPoints.getPricingConfig, HTTPMethods.GET)
  const products = useQuery(["products"], endPoints.getProductConfig, HTTPMethods.GET)
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)

  const renderComputeTiers = pricing?.data?.map((tier: Pricing) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-2" key={tier.computeTier}>
        <div className="flex flex-col justify-between rounded-md p-6">
          <div className="space-y-2">
            <h2 className="font-bold text-lg capitalize">{tier.computeTier} Tier</h2>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {Object.entries(tier.estimatedRequestCost).map(([key, value]) => (
                <li className="flex text-xs items-center text-zinc-600" key={key}>
                  <CheckCircle2 className="scale-75 me-2" />
                  {brandName} {products?.data?.find((item: Product) => item?.productName === key)?.displayName}
                  {" "}$ {Number(value).toFixed(2)}/req
                </li>
              ))}
              <li className="flex text-xs items-center text-zinc-600">
                <CheckCircle2 className="scale-75 me-2" /> {tier.responseDelay} ms response delay
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  })

  const renderProducts = products?.data?.map((product: Product) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-2" key={product?._id}>
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div dangerouslySetInnerHTML={{ __html: product?.productIcon }} style={{ zoom: "150%" }}></div>
          <div className="space-y-2">
            <h3 className="font-bold">{brandName} {product?.displayName}</h3>
            <p className="text-sm text-zinc-600">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    )
  })

  const renderSolutions = solutions?.data?.map((solution: Solution) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-2" key={solution?._id}>
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div dangerouslySetInnerHTML={{ __html: solution?.solutionIcon }} style={{ zoom: "150%" }}></div>
          <div className="space-y-2">
            <h3 className="font-bold">{solution?.solutionName}</h3>
            <p className="text-sm text-zinc-600">
              {solution?.description}
            </p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-white">
        <section id="hero" className="hero space-y-6 pb-8 pt-8 sm:pt-16 sm:py-16 md:pt-16 md:py-16 lg:pt-32 lg:py-32">
          <div className="container flex flex-col gap-4">
            <Link href="" rel="noopener noreferrer">
              <p className="text-sm text-white tracking-normal uppercase">
                {brandName}. {uiConstants.homeBadge}
              </p>
            </Link>
            <h1 className="font-heading text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-tight">
              {uiConstants.homeHeader}
            </h1>
            <p className="leading-normal text-white text-xs md:text-md lg:text-lg">
              {uiConstants.homeIntro1}<br />
              {uiConstants.homeIntro2}<br />
              {uiConstants.homeIntro3}<br />
            </p>
            <div className="space-x-4 space-y-4 mt-2">
              <Link className={cn(buttonVariants({ variant: "default" }))} href="/dashboard">
                Get Started with {brandName}
              </Link>
            </div>
          </div>
        </section>
        <section id="solutions" className="mt-8 container space-y-6 bg-zinc-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Solutions
            </h2>
            <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
              {uiConstants.solutionHeader}
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
            <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
              {uiConstants.openSourceHeader} <br />{" "}
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
        <section id="products" className="container space-y-6 bg-zinc-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Products
            </h2>
            <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
              {uiConstants.productsHeader}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            {renderProducts}
          </div>
        </section>
        <section id="pricing" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Compute Tiers
            </h2>
            <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
              {uiConstants.computeTierHeader}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            {renderComputeTiers}
          </div>
        </section>
      </div >
      <footer>
        <div className="bg-zinc-50">
          <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose md:text-left">
                © {new Date().getFullYear()} {brandName} {uiConstants.copyrightText}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}