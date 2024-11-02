import { cn } from "../../lib/utils"
import { Loader } from "lucide-react"

interface LoaderIconProps {
  inverse?: boolean
}

export default function LoaderIcon({ inverse }: LoaderIconProps) {
  return (
    <Loader
      width="16"
      height="16"
      className={
        inverse
          ? cn("animate-spin", "text-black", "me-2")
          : cn("animate-spin", "text-white", "me-2")
      }
      style={{ animation: "spin 1.5s linear infinite" }}
    />
  )
}
