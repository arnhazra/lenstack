"use client"
import { cn } from "../../lib/utils"
import { LoaderCircle } from "lucide-react"

export default function LoadingComponent() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
        <LoaderCircle
          width="48"
          height="48"
          className={cn("animate-spin", "text-slate-600")}
          style={{ animation: "spin 1s linear infinite" }}
        />
      </div>
    </>
  )
}
