import { GlobalContext } from "@/context/providers/globalstate.provider"
import { useContext } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { brandName, uiConstants } from "@/constants/global-constants"
import { Badge } from "../ui/badge"

export default function CurrentProductCard() {
  const [{ productState }] = useContext(GlobalContext)
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Badge variant="secondary" className="ps-4 pe-4 pt-1 pb-1">{productState.productCategory}</Badge>
        </CardTitle>
        <div className="scale-75" dangerouslySetInnerHTML={{ __html: productState.productIcon }} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {brandName} {productState.displayName}
        </div>
        <p className="text-sm text-slate-600">
          {productState.description}
        </p>
      </CardContent>
      <CardFooter className="-mt-3">
        <Button onClick={(): void => router.push(`/apireference?tab=${productState.productName}`)}>
          API Reference
        </Button>
      </CardFooter>
    </Card>
  )
}
