import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import ProductCard from '@/components/ProductCard'
import { Fragment, useContext } from 'react'
import Show from '@/components/Show'
import Loading from '@/components/Loading'
import { Container, Row } from 'react-bootstrap'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import { AppContext } from '@/context/appStateProvider'

const DashboardPage: NextPage = () => {
    const products = useFetch('get products', endPoints.getProductConfigEndpoint, HTTPMethods.POST, {})
    const [{ userState }] = useContext(AppContext)
    console.log(userState)

    const productsToDisplay = products?.data?.map((product: any) => {
        return <ProductCard key={product.name} productName={product.productName} url={product.url} productAvailable={product.productAvailable} description={product.description} />
    })

    return (
        <Fragment>
            <Show when={!products.isLoading}>
                <Container>
                    <Row className='mb-4'>
                        {productsToDisplay}
                    </Row>
                </Container>
            </Show>
            <Show when={products.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(DashboardPage)