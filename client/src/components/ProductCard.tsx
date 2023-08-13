import { FC } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { ProductCardProps } from "@/types/Types"
import { useRouter } from "next/navigation"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

const ProductCard: FC<ProductCardProps> = ({ productName, description, url, productAvailable, dbRegion }) => {
    const router = useRouter()

    const redirectToProduct = () => {
        if (productAvailable) {
            router.push(url)
        }
    }

    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={3} className="mb-4">
            <Card onClick={redirectToProduct} className={`product-card-${productName.toLowerCase()}`}>
                <Card.Header className="pb-2 ps-4 product-card-header">
                    <p className="branding product-name pb-2 ps-4">{productName}</p>
                    <Button className="circle-btn mb-3"><ArrowTopRightIcon /></Button>
                </Card.Header>
                <Card.Footer className="pt-4 ps-4 product-card-footer">
                    <p className="smalltext">{description}</p>
                    <Button className="tag-chip mb-3">{dbRegion}</Button>
                </Card.Footer>
            </Card>
        </Col >
    )
}

export default ProductCard