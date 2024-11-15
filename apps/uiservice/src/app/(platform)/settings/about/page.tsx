import { brandName } from "@/shared/constants/global-constants"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-slate-200 w-24 h-24 rounded-2xl flex items-center justify-center ecosystem">
        <span className="text-6xl text-white font-bold">17</span>
      </div>
      <p className="text-xs text-slate-700 mt-4">
        {brandName} EcoSystem 17.0.0
      </p>
      <Link
        target="_blank"
        className="text-xs text-blue-500"
        href="https://github.com/arnhazra/arcstack/blob/main/CHANGELOG.md"
      >
        View Changelog
      </Link>
    </div>
  )
}
