import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { ProductCardProps } from '../types/Types'
import { useNavigate } from 'react-router-dom'
import '../styles/productcard.sass'

const ProductCard: FC<ProductCardProps> = ({ productName, description, url, productAvailable }) => {
    const navigate = useNavigate()

    const redirectToProduct = () => {
        if (productAvailable) {
            navigate(url)
        }
    }

    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className='mb-4'>
            <Card onClick={redirectToProduct}>
                <Card.Header className='pt-3'>
                    <div className={`${productName.toLowerCase()}Container pt-4`} />
                </Card.Header>
                <Card.Footer className={`pt-4 pb-2 ps-4 ${productName.toLowerCase()}Color`}>
                    <p className="lead product-name">{productName.toUpperCase()}</p>
                    <p className='smalltext'>{description}</p>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ProductCard