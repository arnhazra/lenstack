"use client"
import useFetch from "@/hooks/use-fetch"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Fragment, useCallback, useContext } from "react"
import Show from "@/components/show-component"
import Loading from "@/components/loading-component"
import { Button, Col, Container, Row } from "react-bootstrap"
import { ProductCardInterface } from "@/types/Types"
import ProductCard from "@/components/productcard-component"
import { GlobalContext } from "@/context/globalstate.provider"
import Error from "@/components/error-component"
import { uiConstants } from "@/constants/global-constants"
import { BellIcon, CubeIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import Hero from "@/components/hero-component"
import InfoPanel from "@/components/infopanel-component"
import moment from "moment"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const router = useRouter()
  const products = useFetch("get-products", `${endPoints.getProductConfig}?searchQuery=${globalSearchString}`, HTTPMethods.GET)
  const activities = useFetch("get-activities", endPoints.getAllActivities, HTTPMethods.GET)

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: product.productStatus,
        className: product.productCategory,
        footerText: product.description,
        headerText: `${uiConstants.brandName} ${product.displayName}`,
        redirectUri: `/products/${product.productName}`,
        isDisabled: product.productStatus !== "Available"
      }

      return (
        <Col xs={12} sm={6} md={6} lg={4} xl={4} className="mb-4" key={product.productName}>
          <ProductCard productCardProps={productCardProps} />
        </Col>
      )
    })

    return (
      <Row className="mb-4" key={Math.random().toString()}>
        <Show when={!!products?.data?.length}>
          {productsToDisplay}
        </Show>
        <Show when={!products?.data?.length}>
          <Error customMessage="No Products to display" />
        </Show>
      </Row>
    )
  }, [products?.data])


  const displayActivities = useCallback(() => {
    const activitiesToDisplay = activities?.data?.activities?.slice(0, 6).map((activity: any) => {
      return (
        <InfoPanel key={activity._id} infoIcon={<BellIcon />} infoName={activity.activityDescription} infoValue={moment(activity.createdAt).fromNow()} />
      )
    })

    return activitiesToDisplay
  }, [activities?.data])

  return (
    <Fragment>
      <Show when={!products.isLoading && !activities.isLoading}>
        <Container>
          <Row>
            <Col xl={9} lg={12} md={12} sm={12} xs={12}>
              <h4 className="text-white">Products</h4>
              {displayProducts()}
            </Col>
            <Col xl={3} lg={12} md={12} sm={12} xs={12}>
              <h4 className="text-white">Activities</h4>
              <Hero>
                <Show when={!!activities?.data?.activities?.length}>
                  {displayActivities()}
                </Show>
                <Show when={!activities?.data?.activities?.length}>
                  <p className="lead">Your activities will appear here once you start using the app more</p>
                </Show>
                <Button variant="secondary" className="btn-block" onClick={(): void => router.push("/activities")}><BellIcon className="icon-left" />Explore All Activities</Button>
              </Hero>
            </Col>
          </Row>
        </Container>
      </Show>
      <Show when={products.isLoading || activities.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}