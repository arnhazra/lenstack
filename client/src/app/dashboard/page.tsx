"use client"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import ProductCard from "@/components/ProductCard"
import { Fragment } from "react"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import { Container, Row } from "react-bootstrap"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"

const DashboardPage: NextPage = () => {
    const products = useFetch("get-products", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

    const productsToDisplay = products?.data?.map((product: any) => {
        return <ProductCard key={product.productName} productName={product.productName} url={product.url} productAvailable={product.productAvailable} description={product.description} dbRegion={product.dbRegion} />
    })

    return (
        <Fragment>
            <Show when={!products.isLoading}>
                <Container>
                    <h4 className="dashboard-header">Welcome to Lenstack!</h4>
                    <Row className="mb-4">
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