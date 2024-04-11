"use client"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import { Badge } from "@/components/ui/badge"
import { BracesIcon, BrainCircuitIcon, HexagonIcon, PieChartIcon } from "lucide-react"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import SkeletonLoading from "@/components/skeleton"
import { TierCardComponent } from "@/components/tiercard"

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=`, HTTPMethods.GET)

  const renderPricing = pricingDetails?.data?.map((pricing: any) => {
    return (
      <li className="flex" key={pricing.planName}>
        <TierCardComponent
          className={cn(pricing.length === 1 && 'xl-col-span-2 xl:col-start-2')}
          {...pricing}
        />
      </li>
    )
  })

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <HexagonIcon className="scale-150" />
          <div className="space-y-2">
            <h3 className="font-bold">{uiConstants.brandName} {product?.displayName}</h3>
            <p className="text-sm text-gray-600">
              {String(product?.description).slice(0, 40)}...
            </p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <Suspense condition={!pricingDetails.isLoading && !products.isLoading} fallback={<SkeletonLoading />}>
      <main className="min-h-screen w-full bg-white">
        <section className="space-y-6 pb-8 pt-6 md:pt-10 lg:py-20">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link href={uiConstants.linkedinUri} target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
                Follow along on LinkedIn
              </Badge>
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              {uiConstants.homeHeader} {uiConstants.brandName}
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 sm:text-xl sm:leading-8">
              {uiConstants.homeIntro}
            </p>
            <div className="space-x-4 space-y-4">
              <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
              <Link href="/#products" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                Explore Products
              </Link>
            </div>
          </div>
        </section>
        <section id="solutions" className="container space-y-6 bg-neutral-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Solutions
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
              Find solutions for putting your ideas into action.
              Solve your business problems with proven combinations of {uiConstants.brandName} services,
              as well as sample architectures and documentation.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <PieChartIcon className="scale-150" />
                <div className="space-y-2">
                  <h3 className="font-bold">Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Analytics provider for web applications.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BrainCircuitIcon className="scale-150" />
                <div className="space-y-2">
                  <h3 className="font-bold">Generative AI</h3>
                  <p className="text-sm text-gray-600">
                    Easily integrate Generative AI models through HTTP
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BracesIcon className="scale-150" />
                <div className="space-y-2">
                  <h3 className="font-bold">Data</h3>
                  <p className="text-sm text-gray-600">
                    Data marketplace & HTTP Database for your apps
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <HexagonIcon className="scale-150" />
                <div className="space-y-2">
                  <h3 className="font-bold">Blockchain</h3>
                  <p className="text-sm text-gray-600">
                    One stop blockchain solutions including ERC-20 & ERC-721 standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="opensource" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Open Source
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
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
        <section id="products" className="container space-y-6 bg-neutral-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Products
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
              Explore products for bringing your vision to life.
              Access all products for different needs with just a free account.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
            {renderProducts}
          </div>
        </section>
        <section id="pricing" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-8">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
              Choose an {uiConstants.brandName} subscription plan that's right for you.
              Downgrade, upgrade or cancel any time.{" "}
              {uiConstants.brandName} offers a variety of plans to meet your requirements.
            </p>
          </div>
          <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:mx-0 xl:max-w-none">
            <ul className={cn('mx-auto grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3', pricingDetails?.data?.length > 3 && '2xl:grid-cols-4')}>
              {renderPricing}
            </ul>
          </div>
        </section>
      </main>
    </Suspense>
  )
}