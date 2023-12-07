"use client"
import axios from "axios"
import { ReactNode } from "react"
import { GlobalStateProvider } from "@/context/globalstate.provider"
import { Toaster } from "react-hot-toast"
import { Quicksand } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/styles/global.style.sass"
import "@/styles/header.style.sass"
import "@/styles/button.style.sass"
import "@/styles/form.style.sass"
import "@/styles/productcard.style.sass"
import { uiConstants } from "@/constants/global-constants"

axios.interceptors.request.use((request) => {
  if (localStorage.hasOwnProperty("accessToken")) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    request.headers["client_id"] = `${localStorage.getItem("clientId")}`
    request.headers["client_secret"] = `${localStorage.getItem("clientSecret")}`
  }
  return request
})

axios.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.replace("/")
    }

    return Promise.reject(error)
  }
)

const quickSand = Quicksand({ subsets: ["latin"], weight: ["600"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })

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
        <QueryClientProvider client={client}>
          <GlobalStateProvider>
            <main className="mt-2 mb-4 pb-4">
              {children}
              <Toaster position="bottom-right" />
            </main>
          </GlobalStateProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
