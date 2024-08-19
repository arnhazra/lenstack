import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

export default function LoaderIcon() {
  return (
    <Loader
      width="16"
      height="16"
      className={cn("animate-spin", "text-white", "me-2")}
      style={{ animation: "spin 1.5s linear infinite" }}
    />
  )
}