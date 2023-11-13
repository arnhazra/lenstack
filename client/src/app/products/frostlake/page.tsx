"use client"
import { Fragment, useContext } from "react"
import endPoints from "@/constants/apiEndpoints"
import Show from "@/components/Show"
import { Badge, Container, Row } from "react-bootstrap"
import Loading from "@/components/Loading"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import moment from "moment"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GenericHero from "@/components/GenericHero"
import { GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/GenericProductCard"
import { GlobalContext } from "@/context/globalStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const projects = useFetch("projects", endPoints.frostlakeGetProjectsEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString })
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: "frostlake" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "frostlake")

  const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
    const genericProductCardProps: GenericProductCardInterface = {
      badgeText: "Project",
      className: "centralized",
      headerText: project.name,
      footerText: `This Project was started by you using Frostlake Platform on ${moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
      redirectUri: `/products/frostlake/project?projectId=${project._id}`
    }

    return (
      <GenericProductCard key={project._id} genericProductCardProps={genericProductCardProps} />
    )
  })

  return (
    <Fragment>
      <Show when={!projects.isLoading}>
        <Container>
          <GenericHero>
            <p className="branding">{selectedProduct?.productName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link className="btn" href="/products/frostlake/createproject"><PlusCircledIcon className="icon-left" />Create Project</Link>
          </GenericHero>
          <Show when={projects?.data?.projects?.length > 0}>
            <h4 className="text-white">Projects</h4>
            <Row className="mt-2 mb-2">
              {projectsToDisplay}
            </Row>
          </Show>
          <Show when={projects?.data?.projects?.length === 0}>
            <h4 className="text-white">No Projects to display</h4>
          </Show>
        </Container>
      </Show>
      <Show when={projects.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
