import { FC } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { ProductCardProps } from '@/types/Types'
import { useRouter } from 'next/navigation'

const ProductCard: FC<ProductCardProps> = ({ productName, description, url, productAvailable, dbRegion }) => {
    const router = useRouter()

    const redirectToProduct = () => {
        if (productAvailable) {
            router.push(url)
        }
    }

    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={4} className='mb-4'>
            <Card onClick={redirectToProduct} className='product-card'>
                <Card.Header className='pt-3 product-card-header'>
                    <div className={`${productName.toLowerCase()}Container pt-4`} />
                </Card.Header>
                <Card.Footer className={`pt-4 pb-2 ps-4 ${productName.toLowerCase()}Color product-card-footer`}>
                    <p className='branding product-name'>{productName}</p>
                    <p className='smalltext'>{description}</p>
                    <Button className='tag-chip mb-3'>{dbRegion}</Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ProductCard