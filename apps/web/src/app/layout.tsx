import { ReactNode } from "react"
import { uiConstants } from "@/constants/global-constants"
import { Quicksand } from "next/font/google"
import Providers from "@/context/providers"
import Header from "@/components/header"
import "@/styles/globals.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["700"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{uiConstants.brandName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="FullStack App" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      </head>
      <body className={quickSand.className}>
        <Providers>
          <Header />
          <main className="min-h-screen w-full bg-slate-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}