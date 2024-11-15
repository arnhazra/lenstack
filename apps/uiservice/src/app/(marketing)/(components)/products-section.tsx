"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { Product } from "@/shared/types"

export default function ProductsSection() {
  const products = useQuery(
    ["products"],
    endPoints.getProductConfig,
    HTTPMethods.GET
  )

  const renderProducts = products?.data?.map((product: Product) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-white p-2"
        key={product?._id}
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
            <p className="text-sm text-zinc-600">{product?.description}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <section
      id="products"
      className="container space-y-6 bg-zinc-50 py-8 dark:bg-transparent md:py-12 lg:py-24 lg:rounded-lg"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Products
        </h2>
        <p className="max-w-[85%] leading-normal text-zinc-600 sm:text-lg sm:leading-7">
          {uiConstants.productsHeader}
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
        {renderProducts}
      </div>
    </section>
  )
}
