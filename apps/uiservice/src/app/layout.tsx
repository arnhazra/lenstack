import { ReactNode } from "react"
import { brandName } from "@/shared/constants/global-constants"
import { Quicksand } from "next/font/google"
import Providers from "@/shared/providers"
import NextTopLoader from "nextjs-toploader"
import "../shared/styles/globals.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["700"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{brandName}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="This Software-as-a-Service (SaaS) platform offers an extensive array of applications catering to diverse needs. Its ecosystem hosts a multifaceted suite of tools and services, each designed to streamline and enhance various aspects of operations across industries."
        />
      </head>
      <body className={quickSand.className}>
        <NextTopLoader color="#475569" showSpinner={false} speed={300} />
        <Providers>
          <main className="min-h-screen w-full bg-slate-50">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
