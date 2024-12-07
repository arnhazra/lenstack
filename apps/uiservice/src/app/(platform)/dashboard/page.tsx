"use client"
import { Copy, Workflow } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import { useRouter } from "next/navigation"
import useFetch from "@/shared/hooks/use-fetch"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import { brandName } from "@/shared/constants/global-constants"
import { Product } from "@/shared/types"
import MaskText from "@/shared/components/mask"
import Show from "@/shared/components/show"
import Loading from "@/app/loading"

export default function Page() {
  const [{ user, selectedWorkspace, subscription }] = useContext(GlobalContext)
  const router = useRouter()
  const products = useFetch({
    queryKey: ["products"],
    queryUrl: endPoints.getProductConfig,
    method: HTTPMethods.GET,
  })

  const renderProducts = products?.data?.map((product: Product) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-white p-2 cursor-pointer"
        key={product?._id}
        onClick={(): void => router.push(`/products/${product?.productName}`)}
      >
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <div
            dangerouslySetInnerHTML={{ __html: product?.productIcon }}
            style={{ zoom: "150%" }}
          ></div>
          <div className="space-y-2">
            <h3 className="font-bold">
              {brandName} {product?.displayName}
            </h3>
            <p className="text-sm text-slate-600">{product?.description}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <Show condition={!products.isLoading} fallback={<Loading />}>
      <main className="grid flex-1 items-start gap-4 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Hey, {user.name.split(" ")[0]}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Dashboard for Seamless Management and
                  Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  onClick={(): void => router.push("/settings/workspace")}
                >
                  View Workspaces
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">
                  XP Credits
                </CardDescription>
                <CardTitle className="text-2xl">
                  {subscription ? subscription.xp.toFixed(2) : 0}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Available Credits
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">
                  Subscription Tier
                </CardDescription>
                <CardTitle className="text-2xl capitalize">
                  {subscription?.subscriptionTier ?? "No Subscription"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Selected Tier
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
            {renderProducts}
          </div>
        </div>
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-slate-50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Workspace
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>{selectedWorkspace.name}</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={(): void => router.push("/settings/workspace")}
                >
                  <Workflow className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Open Workspace
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Workspace Information</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Workspace Access Key
                    </span>
                    <span>
                      <MaskText value={selectedWorkspace.accessKey} />
                    </span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">User Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">{user.email}</a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">XP</dt>
                    <dd>{subscription ? subscription.xp.toFixed(2) : 0}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                {brandName} Inc.
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </Show>
  )
}
