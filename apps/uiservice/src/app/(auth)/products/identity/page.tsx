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
import CurrentProductCard from "@/components/currentproductcard"
import { DataModal } from "@/components/datamodal"

export default function Page() {
  const users = useQuery(["users"], endPoints.identityGetAllUsers, HTTPMethods.GET)

  const renderUsers = users?.data?.map((user: any, id: number) => {
    return (
      <TableRow className="cursor-pointer" key={user._id}>
        <TableCell>{user.email}</TableCell>
        <TableCell className="hidden md:table-cell">{format(new Date(user.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
        <TableCell className="text-right md:table-cell">
          <DataModal dataObj={user} />
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!users.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!users.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <CurrentProductCard />
            <Card className="xl:col-span-2">
              <CardHeader className="px-7">
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Your users in this organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={users?.data?.length > 0} fallback={<p className="text-center">No data to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right md:table-cell">View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderUsers}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense >
  )
}
