"use client"
import { Quicksand } from 'next/font/google'
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import "@/_styles/global.sass"
import "@/_styles/header.sass"
import "@/_styles/button.sass"
import "@/_styles/form.sass"
import "@/_styles/appcard.sass"
import "@/_styles/datasetcard.sass"
import "@/_styles/sourcecode.sass"
import "@/_styles/tokencard.sass"

const quickSand = Quicksand({ subsets: ['latin'] })

export const dashboardConfig = {
  mainNav: [
    {
      title: "Developer",
      href: "/developer",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b bg-white">
            <div className="container flex h-14 items-center justify-between py-6">
              <MainNav items={dashboardConfig.mainNav} />
              <nav>
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Try Free
                </Link>
              </nav>
            </div>
          </header>
          <main className="mt-2 ms-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
