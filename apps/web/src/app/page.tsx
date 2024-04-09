import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDownIcon, BracesIcon, BrainCircuitIcon, DatabaseZap, DatabaseZapIcon, HexagonIcon, PieChartIcon, ScanBarcodeIcon, WalletIcon } from "lucide-react"

export default function Settings() {
  return (
    <main className="min-h-screen w-full bg-white">
      <section className="space-y-6 pb-8 pt-6 md:pt-10 lg:py-20">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm font-medium"
          >
            Follow along on LinkedIn
          </Badge>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
            {uiConstants.homeHeader} {uiConstants.brandName}
          </h1>
          <p className="max-w-[42rem] leading-normal text-gray-600 sm:text-xl sm:leading-8">
            {uiConstants.homeIntro}
          </p>
          <div className="space-x-4">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href="/exploreproducts"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-neutral-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Products
          </h2>
          <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <PieChartIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Analytics</h3>
                <p className="text-sm text-gray-600">
                  An analytics provider for web applications.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BrainCircuitIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Copilot</h3>
                <p className="text-sm text-gray-600">
                  Server and Client Components. Use hook.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BracesIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Data Exchange</h3>
                <p className="text-sm text-gray-600">
                  ORM using Prisma and deployed on PlanetScale.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <DatabaseZapIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">KV Store</h3>
                <p className="text-sm text-gray-600">
                  UI components built using Radix UI and styled with Tailwind
                  CSS.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ScanBarcodeIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Ledger Scan</h3>
                <p className="text-sm text-gray-600">
                  Authentication using NextAuth.js and middlewares.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <HexagonIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">NFT Studio</h3>
                <p className="text-sm text-gray-600">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ArrowUpDownIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Swap</h3>
                <p className="text-sm text-gray-600">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <WalletIcon className="scale-150" />
              <div className="space-y-2">
                <h3 className="font-bold">Wallet</h3>
                <p className="text-sm text-gray-600">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto pt-4 text-center md:max-w-[58rem]">
          <p className="leading-normal text-gray-600 sm:text-lg sm:leading-7">
            {uiConstants.brandName} also includes a full-featured api reference.
          </p>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
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
    </main>
  )
}
