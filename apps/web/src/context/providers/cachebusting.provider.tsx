"use client"
import SkeletonLoading from "@/components/skeleton"
import { ReactNode } from "react"
import CacheBuster from "react-cache-buster"

export function CachebustingProvider({ children }: { children: ReactNode }) {
  return (
    <CacheBuster
      currentVersion="11.0.0"
      isEnabled={process.env.NODE_ENV === "production"}
      isVerboseMode={false}
      loadingComponent={<SkeletonLoading />}
      metaFileDirectory={"."}
    >
      {children}
    </CacheBuster>
  )
}
