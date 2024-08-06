"use client"
import ErrorComponent from "@/components/error"
import { useEffect } from "react"

export default function Error() {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <ErrorComponent />
  )
}
