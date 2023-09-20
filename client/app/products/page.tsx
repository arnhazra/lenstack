"use client"
import Loading from "@/_components/Loading"
import ProductCard from "@/_components/ProductCard"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import React from 'react'
import { Button, Container, Row } from "react-bootstrap"

const ProductPage: NextPage = () => {
    const products = useFetch("get-products", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
    const searchParams = useSearchParams()
    const router = useRouter()
    const productName = searchParams.get("productName")

    const selectedProduct = products?.data?.find((product: any) => {
        return product.productName === productName
    })

    const productsToDisplay = products?.data?.filter((product: any) => product.productName !== productName).map((product: any) => {
        return <ProductCard key={product.productName} productName={product.productName} url={product.url} productAvailable={product.productAvailable} description={product.description} dbRegion={product.dbRegion} />
    })

    const launchProduct = () => {
        router.push(`/${productName}`)
    }

    return (
        <Container>
            <Show when={products?.isLoading}>
                <Loading />
            </Show>
            <Show when={!products?.isLoading}>
                <div className="jumbotron p-4">
                    <p className="branding text-capitalize">{selectedProduct?.productName}</p>
                    <p className="lead mt-3">{selectedProduct?.description}</p>
                    <Button className="tag-chip">{selectedProduct?.dbRegion}</Button>
                    <Button className="tag-chip">{selectedProduct?.productAvailable ? 'Available' : 'Under Maintainance'}</Button><br />
                    <Button className="mt-2" onClick={launchProduct}>Go to App<ArrowRightIcon className="icon-right" /></Button>
                </div>
                <h4 className="dashboard-header mt-2">Other Products</h4>
                <Row className="mb-4 mt-2">
                    {productsToDisplay}
                </Row>
            </Show>
        </Container>
    )
}

export default ProductPage