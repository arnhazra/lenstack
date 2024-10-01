"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Solutions } from "./components/solutions"
import { Products } from "./components/products"
import { useContext } from "react"
import useQuery from "@/hooks/use-query"
import { GlobalContext } from "@/context/globalstate.provider"
import HTTPMethods from "@/constants/http-methods"
import { endPoints } from "@/constants/api-endpoints"
import { useRouter } from "next/navigation"
import { brandName } from "@/constants/global-constants"
import { Layers2, Orbit, User, Wallet } from "lucide-react"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const products = useQuery(["products"], endPoints.getProductConfig, HTTPMethods.GET)
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
  const router = useRouter()

  return (
    <Suspense condition={!products.isLoading && !solutions.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!products.error && !solutions.error} fallback={<LoadingComponent />}>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/user")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {brandName}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hey, {userState.name.split(" ")[0]}</div>
              <p className="text-sm text-slate-600">
                Welcome to your dashboard
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/organization")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Organization
              </CardTitle>
              <Orbit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userState.selectedOrgName}
              </div>
              <p className="text-sm text-slate-600">
                Your current organization
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/wallet")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$ {userState.walletBalance.toFixed(2)}</div>
              <p className="text-sm text-slate-600">
                Credits remaining
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/compute")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compute Tier</CardTitle>
              <Layers2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userState.computeTier}</div>
              <p className="text-sm text-slate-600">
                Current compute tier
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-8">
          <Card className="lg:col-span-5 md:col-span-8">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Products offerings by {brandName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Products products={products?.data ?? []} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 md:col-span-8">
            <CardHeader>
              <CardTitle>Solutions</CardTitle>
              <CardDescription>
                Solutions offerings by {brandName}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Solutions solutions={solutions.data ?? []} />
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </Suspense>
  )
}