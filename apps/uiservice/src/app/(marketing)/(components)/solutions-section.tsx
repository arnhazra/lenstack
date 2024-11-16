"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import useQueryWithSuspense from "@/shared/hooks/use-suspense-query"
import { Solution } from "@/shared/types"

export default function SolutionsSection() {
  const solutions = useQueryWithSuspense(
    ["solutions"],
    endPoints.getSolutionConfig,
    HTTPMethods.GET
  )

  const renderSolutions = solutions?.data?.map((solution: Solution) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-white p-2"
        key={solution?._id}
      >
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div
            dangerouslySetInnerHTML={{ __html: solution?.solutionIcon }}
            style={{ zoom: "150%" }}
          ></div>
          <div className="space-y-2">
            <h3 className="font-bold">{solution?.solutionName}</h3>
            <p className="text-sm text-slate-600">{solution?.description}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <section
      id="solutions"
      className="mt-8 container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Solutions
        </h2>
        <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
          {uiConstants.solutionHeader}
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
        {renderSolutions}
      </div>
    </section>
  )
}
