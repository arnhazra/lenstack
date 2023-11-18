"use client"
import { Fragment, useCallback, useContext } from "react"
import { endPoints } from "@/constants/api.endpoints"
import Show from "@/components/show.component"
import { Badge, Container, Row } from "react-bootstrap"
import Loading from "@/components/loading.component"
import HTTPMethods from "@/constants/http.methods"
import useFetch from "@/hooks/useFetch"
import moment from "moment"
import { PlusCircledIcon, ReaderIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Hero from "@/components/hero.component"
import { ProductCardInterface } from "@/types/Types"
import ProductCard from "@/components/productcard.component"
import { GlobalContext } from "@/context/globalstate.provider"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const dbs = useFetch("dbs", endPoints.fabricGetMyDbs, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "fabric" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "fabric")

  const displayDatabases = useCallback(() => {
    const dbsToDisplay = dbs?.data?.dbs?.map((db: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: "Database",
        className: "centralized",
        headerText: db.name,
        footerText: `This Database was created by you using Fabric on ${moment(db.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/fabric/database?dbId=${db._id}`
      }

      return (
        <ProductCard key={db._id} productCardProps={productCardProps} />
      )
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!dbs?.data?.dbs?.length}>
          <h4 className="text-white">My Databases</h4>
          {dbsToDisplay}
        </Show >
        <Show when={!dbs?.data?.dbs?.length}>
          <h4 className="text-white">No Databases to display</h4>
        </Show>
      </Row>
    )
  }, [dbs?.data])

  return (
    <Fragment>
      <Show when={!dbs.isLoading && !products.isLoading}>
        <Container>
          <Hero>
            <p className="branding">{selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
            <Link className="btn" href="/products/fabric/createdb"><PlusCircledIcon className="icon-left" />Create Database</Link>
          </Hero>
          {displayDatabases()}
        </Container>
      </Show>
      <Show when={dbs.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
