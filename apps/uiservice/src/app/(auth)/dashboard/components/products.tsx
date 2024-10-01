import ActivityLog from "@/components/activity"
import { Avatar } from "@/components/ui/avatar"
import { Product } from "@/types/Types"
import { useRouter } from "next/navigation"

export function Products({ products }: { products: Product[] }) {
  const router = useRouter()

  const renderProducts = products.map((product) => {
    return (
      <div
        className="flex items-center cursor-pointer hover:bg-zinc-100 rounded-md p-2"
        key={product?._id}
        onClick={(): void => router.push(`/products/${product.productName}`)}
      >
        <Avatar className="h-9 w-9">
          <div className="scale-75" dangerouslySetInnerHTML={{ __html: product.productIcon }} />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{product?.displayName}</p>
          <p className="text-sm text-zinc-500">
            {product?.description}
          </p>
        </div>
        <div className="ml-auto font-medium">
          <ActivityLog keyword={product.productName} />
        </div>
      </div>
    )
  })

  return (
    <div className="space-y-8">
      {renderProducts}
    </div>
  )
}