"use client"
import Loading from "@/components/loading"
import { ReactNode } from "react"
import CacheBuster from "react-cache-buster"

export function CachebustingProvider({ children }: { children: ReactNode }) {
  return (
    <CacheBuster
      currentVersion="11.0.0"
      isEnabled={process.env.NODE_ENV === "production"}
      isVerboseMode={false}
      loadingComponent={<Loading />}
      metaFileDirectory={"."}
    >
      {children}
    </CacheBuster>
  )
}
