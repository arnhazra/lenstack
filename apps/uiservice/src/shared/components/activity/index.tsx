import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import { Activity } from "lucide-react"
import useSWRQuery from "@/shared/hooks/use-swr"

export default function ActivityLog({ keyword }: { keyword: string }) {
  const activityCount = useSWRQuery({
    queryKey: ["activity-search", keyword],
    queryUrl: endPoints.activityTrends,
    method: HTTPMethods.POST,
    suspense: false,
    requestBody: { searchKeyword: keyword },
  })

  return (
    <div className="flex gap-4">
      <div
        className="flex items-center text-slate-600 text-sm"
        title="Total App Usage"
      >
        <Activity className="mr-1 h-3 w-3 text-teal-600" />
        {activityCount?.data?.totalUsage ?? "..."}
      </div>
    </div>
  )
}
