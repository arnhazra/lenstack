import { CubeIcon } from "@radix-ui/react-icons"
import "./style.sass"

export interface ProductCardInterface {
  headerText: string
  footerText: string
  redirectUri: string
}

export interface ProductCardProps {
  productCardProps: ProductCardInterface
}

export default function ProductCard({ productCardProps }: ProductCardProps) {
  return (
    <div className="product-card pt-2 ps-4 pe-4 pb-1">
      <div className="product-card-header">
        <p className="product-card-header pt-2 pb-1">
          <CubeIcon className="icon-product" />
          {productCardProps.headerText}
        </p>
      </div>
      <div className="product-card-footer pt-1">
        <p className="muted-text">
          {productCardProps.footerText}
        </p>
      </div>
    </div>
  )
}