import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { useContext } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Orbit } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Suspense from "../suspense"
import { Skeleton } from "../ui/skeleton"

export default function CurrentOrgCard() {
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()
  const organizations = useQuery(["organizations"], endPoints.organization, HTTPMethods.GET)
  const selectedOrg = organizations?.data?.find((org: any) => org._id === userState.selectedOrgId)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Organization
        </CardTitle>
        <Orbit className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Suspense condition={!organizations.isLoading} fallback={<Skeleton className="h-8 w-[150px]" />}>
            {selectedOrg?.name}
          </Suspense>
        </div>
        <p className="text-sm text-slate-600">
          Your current organization
        </p>
      </CardContent>
      <CardFooter className="-mt-3">
        <Button onClick={(): void => router.push("/account?tab=organization")}>Switch Organization</Button>
      </CardFooter>
    </Card>
  )
}
