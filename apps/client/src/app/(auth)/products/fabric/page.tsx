"use client"
import { useCallback, useContext } from "react"
import { endPoints } from "@/constants/api-endpoints"
import Suspense from "@/components/suspense"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Loading from "@/components/loading"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { PlusCircledIcon, ReaderIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Hero from "@/components/hero"
import Card, { CardInterface } from "@/components/card"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { formatDistanceToNow } from "date-fns"

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const { prompt } = usePromptContext()
  const router = useRouter()
  const dbs = useQuery(["databases"], `${endPoints.fabricGetMyDbs}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=fabric`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "fabric")

  const displayDatabases = useCallback(() => {
    const dbsToDisplay = dbs?.data?.dbs?.map((db: any) => {
      const cardProps: CardInterface = {
        badgeText: "Database",
        className: "centralized",
        headerText: db.name,
        footerText: `This Database was created by you using Fabric on ${formatDistanceToNow(new Date(db.createdAt), { addSuffix: true })}. To check more click on this card.`,
        redirectUri: `/products/fabric/database?dbId=${db._id}`
      }

      return <Card key={db._id} cardProps={cardProps} />
    })

    return (
      <Suspense condition={!!dbs?.data?.dbs?.length} fallback={<h4 className="text-white">No Databases to display</h4>}>
        <h4 className="text-white">My Databases</h4>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {dbsToDisplay}
        </Row>
      </Suspense>
    )
  }, [dbs?.data])

  const createDatabase = async () => {
    const { hasConfirmed, value } = await prompt("Your Database name")

    if (hasConfirmed && value) {
      try {
        const response = await axios.post(endPoints.fabricCreateDb, { name: value })
        toast.success("Database Created")
        router.push(`/products/fabric/database?dbId=${response.data.db._id}`)
      }

      catch (error: any) {
        toast.error("Unable to create Database")
      }
    }
  }

  return (
    <Suspense condition={!dbs.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!dbs.error && !products.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-secondary">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
            <Button variant="primary" onClick={createDatabase}><PlusCircledIcon className="icon-left" />Create Database</Button>
          </Hero>
          {displayDatabases()}
        </Container>
      </Suspense>
    </Suspense>
  )
}
