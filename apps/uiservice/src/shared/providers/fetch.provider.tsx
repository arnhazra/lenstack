"use client"
import { SWRConfig, SWRConfiguration } from "swr"
import { ReactNode } from "react"
import { FetchInterceptor } from "@mswjs/interceptors/fetch"

const interceptor = new FetchInterceptor()

interceptor.apply()
interceptor.on("request", ({ request }) => {
  request.headers.set(
    "Authorization",
    `Bearer ${localStorage.getItem("accessToken")}`
  )
  request.headers.set(
    "refresh_token",
    `${localStorage.getItem("refreshToken")}`
  )
  request.headers.set("access_key", `${localStorage.getItem("accessKey")}`)
})

interceptor.on("response", ({ response }) => {
  if (response.headers.has("token") || response.headers.has("Token")) {
    const newAccessToken =
      response.headers.get("token") ?? response.headers.get("Token") ?? ""
    localStorage.setItem("accessToken", newAccessToken)
  }

  if (response.status === 401) {
    localStorage.clear()
    window.location.replace("/")
  }
})

export function FetchProvider({ children }: { children: ReactNode }) {
  const config: SWRConfiguration = {
    errorRetryCount: 2,
    errorRetryInterval: 2500,
  }

  return <SWRConfig value={config}>{children}</SWRConfig>
}
