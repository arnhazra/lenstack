"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingComponent from "@/components/loading"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [])

  return (
    <LoadingComponent />
  )
}
