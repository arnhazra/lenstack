"use client"
import LoadingComponent from "@/components/loading"
import { useEffect } from "react"

export default function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <LoadingComponent />
  )
}
