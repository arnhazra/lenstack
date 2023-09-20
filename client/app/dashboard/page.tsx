"use client"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import ProductCard from "@/_components/ProductCard"
import { Fragment, useContext } from "react"
import Show from "@/_components/Show"
import Loading from "@/_components/Loading"
import { Button, Container, Row } from "react-bootstrap"
import withAuth from "@/_utils/withAuth"
import { NextPage } from "next"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"

const DashboardPage: NextPage = () => {
    const products = useFetch("get-products", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)
    const [{ userState }] = useContext(AppContext)

    const productsToDisplay = products?.data?.map((product: any) => {
        return <ProductCard key={product.productName} productName={product.productName} url={product.url} productAvailable={product.productAvailable} description={product.description} dbRegion={product.dbRegion} />
    })

    const activateTrial = async () => {
        try {
            await axios.post(endPoints.activateTrialEndpoint)
            toast.success(Constants.ToastSuccess)
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    return (
        <Fragment>
            <Show when={!products.isLoading}>
                <Container>
                    <h4 className="dashboard-header">Welcome to Lenstack!</h4>
                    <Show when={userState.trialAvailable}>
                        <Button onClick={activateTrial}>Activate Trial</Button>
                    </Show>
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