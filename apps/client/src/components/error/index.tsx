"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingComponent from "../loading"

export default function Error() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [])

  return (
    <LoadingComponent />
  )
}
