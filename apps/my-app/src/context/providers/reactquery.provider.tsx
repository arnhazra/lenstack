"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios"
import { ReactNode } from "react"

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

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        retry: 2,
        retryDelay: 2500,
        enabled: true
      }
    }
  })

  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}
