"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import { ViewEvent } from "./components/view-event"
import CurrentOrgCard from "@/components/currentorgcard"
import CurrentProductCard from "@/components/currentproductcard"

export default function Page() {
  const insights = useQuery(["insights"], endPoints.insightsView, HTTPMethods.GET)

  const renderInsights = insights?.data?.map((event: any) => {
    return (
      <TableRow className="cursor-pointer" key={event._id}>
        <TableCell className="text-slate-500">{format(new Date(event.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
        <TableCell className="text-right md:table-cell">
          <ViewEvent eventObj={event} />
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!insights.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!insights.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <CurrentProductCard />
              <CurrentOrgCard />
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Metrics Count</CardDescription>
                  <CardTitle className="text-4xl">{insights?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of events
                    in this organization
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card className="xl:col-span-2">
              <CardHeader className="px-7">
                <CardTitle>Insights</CardTitle>
                <CardDescription>
                  Your Insights in this organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={insights?.data?.length > 0} fallback={<p className="text-center">No data to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right md:table-cell">Event</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderInsights}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
