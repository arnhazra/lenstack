import ActivityLog from "@/components/activity"
import { Avatar } from "@/components/ui/avatar"
import { Solution } from "@/types/Types"

export function Solutions({ solutions }: { solutions: Solution[] }) {
  const renderSolutions = solutions.map((solution) => {
    return (
      <div
        className="flex items-center cursor-pointer hover:bg-zinc-100 rounded-md p-2"
        key={solution._id}
      >
        <Avatar className="h-9 w-9">
          <div className="scale-75" dangerouslySetInnerHTML={{ __html: solution.solutionIcon }} />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{solution?.solutionName}</p>
          <p className="text-sm text-zinc-500">
            {solution?.description}
          </p>
        </div>
        <div className="ml-auto font-medium">
          <ActivityLog keyword={solution.solutionName} />
        </div>
      </div>
    )
  })

  return (
    <div className="space-y-8">
      {renderSolutions}
    </div>
  )
}