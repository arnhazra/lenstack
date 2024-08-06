import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

export default function LoaderIcon() {
  return (
    <LoaderCircle
      width="16"
      height="16"
      className={cn("animate-spin", "text-white", "me-2")}
      style={{ animation: "spin 1s linear infinite" }}
    />
  )
}