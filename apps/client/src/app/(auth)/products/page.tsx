"use client"
import { Fragment, useCallback, useContext, useEffect } from "react"
import { Badge, Col, Container } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { GenericCard, GenericCardProps } from "@/components/card"
import Grid from "@/components/grid"

export default function Page() {
  const [{ appState, userState }] = useContext(GlobalContext)
  const router = useRouter()
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)

  useEffect(() => {
    router.push(`/products?workspaceId=${userState.selectedWorkspaceId}`)
  }, [userState.selectedWorkspaceId])

  const displayProducts = useCallback(() => {
    const productsToDisplay = products?.data?.map((product: any) => {
      const productCardProps: GenericCardProps = {
        header: `${uiConstants.brandName} ${product.displayName}`,
        footer: <Fragment>
          <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">{product.productCategory}</Badge>
          <p className="text-muted">{product.description}</p>
        </Fragment>,
      }

      return (
        <Col key={product.productName} className="mb-3">
          <Link href={`/products/${product.productName}`}>
            <GenericCard {...productCardProps} />
          </Link>
        </Col>
      )
    })

    return (
      <Suspense condition={!!products?.data?.length} fallback={<h4 className="text-white">No Products to display</h4>}>
        <h4 className="text-white">Explore the experience</h4>
        <Grid>
          {productsToDisplay}
        </Grid>
      </Suspense>
    )
  }, [products?.data])

  return (
    <Suspense condition={!products.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error} fallback={<Error />}>
        <Container>
          {displayProducts()}
        </Container>
      </Suspense>
    </Suspense>
  )
}