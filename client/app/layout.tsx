"use client"
import axios from "axios"
import IdentityProvider from "@/_providers/IdentityProvider"
import Footer from "@/_components/Footer"
import { AppStateProvider } from "@/_context/appStateProvider"
import { Toaster } from "sonner"
import { Quicksand } from "next/font/google"
import Header from "@/_components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/_styles/global.sass"
import "@/_styles/header.sass"
import "@/_styles/button.sass"
import "@/_styles/form.sass"
import "@/_styles/genericappcard.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["600"] })

axios.interceptors.request.use((request) => {
  if (localStorage.hasOwnProperty("accessToken")) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  }
  return request
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })

  return (
    <html lang="en">
      <head>
        <title>Lenstack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Lenstack" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      </head>
      <body className={quickSand.className}>
        <QueryClientProvider client={client}>
          <AppStateProvider>
            <IdentityProvider>
              <nav className="header">
                <Header />
              </nav>
              <main className="mt-2 mb-4 pb-4">
                {children}
                <Toaster position="bottom-right" richColors />
              </main>
              <Footer />
            </IdentityProvider>
          </AppStateProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
