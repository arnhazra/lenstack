import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["600"] })

export const metadata: Metadata = {
  title: "ArcStack",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        {children}
      </body>
    </html>
  )
}
