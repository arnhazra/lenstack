"use client"
import LoadingComponent from "@/components/loading"
import { ReactNode } from "react"
import CacheBuster from "react-cache-buster"

export function CachebustingProvider({ children }: { children: ReactNode }) {
  return (
    <CacheBuster
      currentVersion="7.6.0"
      isEnabled={process.env.NODE_ENV === "production"}
      isVerboseMode={false}
      loadingComponent={<LoadingComponent />}
      metaFileDirectory={"."}
    >
      {children}
    </CacheBuster>
  )
}
