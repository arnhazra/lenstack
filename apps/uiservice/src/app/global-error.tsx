"use client"
import ErrorComponent from "@/components/error"
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorComponent />
  )
}