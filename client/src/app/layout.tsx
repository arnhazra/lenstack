import { ReactNode } from "react"
import { uiConstants } from "@/constants/global-constants"
import { Toaster } from "react-hot-toast"
import { Quicksand } from "next/font/google"
import Providers from "@/context/providers"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["600"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{uiConstants.brandName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Nest & Next App" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      </head>
      <body className={quickSand.className}>
        <Providers>
          <main className="mt-2 mb-4 pb-4">
            {children}
            <Toaster position="bottom-right" />
          </main>
        </Providers>
      </body>
    </html>
  )
}
