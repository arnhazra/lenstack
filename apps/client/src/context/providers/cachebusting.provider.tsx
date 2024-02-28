"use client"
import { ReactNode } from "react"
import CacheBuster from "react-cache-buster"
import Loading from "@/components/loading"

export function CachebustingProvider({ children }: { children: ReactNode }) {
  return (
    <CacheBuster
      currentVersion="9.3.1"
      isEnabled={process.env.NODE_ENV === "production"}
      isVerboseMode={false}
      loadingComponent={<Loading />}
      metaFileDirectory={'.'}
    >
      {children}
    </CacheBuster>
  )
}
