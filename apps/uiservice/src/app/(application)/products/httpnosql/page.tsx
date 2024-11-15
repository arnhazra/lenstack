"use client"
import ErrorComponent from "@/shared/components/error"
import LoadingComponent from "@/shared/components/loading"
import Suspense from "@/shared/components/suspense"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { format } from "date-fns"
import { DataModal } from "@/shared/components/datamodal"

export default function Page() {
  const dataList = useQuery(
    ["datalist"],
    `${endPoints.httpnosqlReadData}`,
    HTTPMethods.GET
  )

  const renderData = dataList?.data?.map((data: any) => {
    return (
      <TableRow className="cursor-pointer" key={data._id}>
        <TableCell>
          <div className="font-medium">{data?.key}</div>
        </TableCell>
        <TableCell className="text-zinc-500">
          <DataModal dataObj={data} />
        </TableCell>
        <TableCell className="text-right text-zinc-500 hidden md:table-cell">
          {format(new Date(data.createdAt), "MMM, do yyyy, h:mm a")}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!dataList.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!dataList.error} fallback={<ErrorComponent />}>
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Database</CardTitle>
            <CardDescription>
              Your Datalist list in this workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              condition={dataList?.data?.length > 0}
              fallback={<p className="text-center">No data to display</p>}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right hidden md:table-cell">
                      Created At
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderData}</TableBody>
              </Table>
            </Suspense>
          </CardContent>
        </Card>
      </Suspense>
    </Suspense>
  )
}
