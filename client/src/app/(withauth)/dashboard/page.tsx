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
import SubHeader from "@/components/sub-header-component"
import { BellIcon, CubeIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import Hero from "@/components/hero-component"
import InfoPanel from "@/components/infopanel-component"
import moment from "moment"

export default function Page() {
  const [{ globalSearchString, userState }] = useContext(GlobalContext)
  const router = useRouter()
  const userName = userState.email.split("@")[0].toString().slice(0, 10) ?? ""
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: globalSearchString }, true)
  const activities = useFetch("get-activities", endPoints.getAllActivities, HTTPMethods.GET, {}, true)

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
        <Col xs={12} sm={6} md={6} lg={4} xl={4} className="mb-4">
          <ProductCard key={product.productName} productCardProps={productCardProps} />
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
      <Show when={!products.isLoading}>
        <SubHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-white">Hey, @{userName}</h4>
            <div className="ml-auto">
              <CubeIcon className="icon-subheader" onClick={() => router.push("/workspace")} />
            </div>
          </div>
        </SubHeader>
        <Container>
          <Row>
            <Col xl={9} lg={12} md={12} sm={12} xs={12}>
              <h4 className="text-white">Browse Products</h4>
              {displayProducts()}
            </Col>
            <Col xl={3} lg={12} md={12} sm={12} xs={12}>
              <h4 className="text-white">Live Activities</h4>
              <Hero>
                {displayActivities()}
                <Button variant="secondary" className="btn-block"><BellIcon className="icon-left" />View All Activities</Button>
              </Hero>
            </Col>
          </Row>
        </Container>
      </Show>
      <Show when={products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}