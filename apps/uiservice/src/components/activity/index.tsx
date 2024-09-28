import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { Activity, TrendingUp } from "lucide-react"

export default function ActivityLog({ keyword }: { keyword: string }) {
  const activityCount = useQuery(["activity-search", keyword], endPoints.activitySearch, HTTPMethods.POST, { searchKeyword: keyword })

  return (
    <div className="flex gap-4">
      <div className="flex items-center text-zinc-600 text-sm" title="Total App Usage">
        <Activity className="mr-1 h-3 w-3 text-teal-600" />
        {activityCount?.data?.totalUsage ?? "..."}
      </div>
      <div className="flex items-center text-zinc-600 text-sm" title="Your App Usage">
        <TrendingUp className="mr-1 h-3 w-3 text-cyan-600" />
        {activityCount?.data?.userUsage ?? "..."}
      </div>
    </div>
  )
}