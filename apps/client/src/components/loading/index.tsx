"use client"
import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"
import { Fragment, useEffect } from "react"

export default function LoadingComponent() {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <Fragment>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
        <LoaderCircle
          width="36"
          height="36"
          className={cn("animate-spin", "text-neutral-600")}
          style={{ animation: "spin 1s linear infinite" }}
        />
      </div>
    </Fragment>
  )
}
