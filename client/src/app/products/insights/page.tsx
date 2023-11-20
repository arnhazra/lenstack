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
  const projects = useFetch("projects", endPoints.insightsGetProjects, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "insights" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "insights")

  const displayProjects = useCallback(() => {
    const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: "Project",
        className: "centralized",
        headerText: project.name,
        footerText: `This Project was started by you using Insights Platform on ${moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/insights/project?projectId=${project._id}`
      }

      return (
        <ProductCard key={project._id} productCardProps={productCardProps} />
      )
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!projects?.data?.projects?.length}>
          <h4 className="text-white">Projects</h4>
          {projectsToDisplay}
        </Show >
        <Show when={!projects?.data?.projects?.length}>
          <h4 className="text-white">No Projects to display</h4>
        </Show>
      </Row>
    )
  }, [projects?.data])

  return (
    <Fragment>
      <Show when={!projects.isLoading && !products.isLoading}>
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
            <Link className="btn" href="/products/insights/createproject"><PlusCircledIcon className="icon-left" />Create Project</Link>
          </Hero>
          {displayProjects()}
        </Container>
      </Show>
      <Show when={projects.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
