"use client"
import { Quicksand } from 'next/font/google'
import './globals.sass'
import Header from "@/components/header"

const inter = Quicksand({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
