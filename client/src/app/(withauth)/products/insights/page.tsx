"use client"
import { Fragment, useCallback, useContext } from "react"
import { endPoints } from "@/constants/api-endpoints"
import Show from "@/components/show"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Loading from "@/components/loading"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import moment from "moment"
import { PlusCircledIcon, ReaderIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Hero from "@/components/hero"
import Card, { CardInterface } from "@/components/card"
import { GlobalContext } from "@/context/globalstate.provider"
import usePrompt from "@/hooks/use-prompt"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const { prompt, promptDialog } = usePrompt()
  const router = useRouter()
  const projects = useQuery("projects", `${endPoints.insightsGetProjects}?searchQuery=${globalSearchString}`, HTTPMethods.GET)
  const products = useQuery("get-products", `${endPoints.getProductConfig}?searchQuery=insights`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "insights")

  const displayProjects = useCallback(() => {
    const projectsToDisplay = projects?.data?.projects?.map((project: any) => {
      const cardProps: CardInterface = {
        badgeText: "Project",
        className: "centralized",
        headerText: project.name,
        footerText: `This Project was started by you using Insights Platform on ${moment(project.createdAt).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/insights/project?projectId=${project._id}`
      }

      return <Card key={project._id} cardProps={cardProps} />
    })

    return (
      <Fragment>
        <Show when={!!projects?.data?.projects?.length}>
          <h4 className="text-white">My Projects</h4>
          <Row xs={1} sm={1} md={2} lg={3} xl={4}>
            {projectsToDisplay}
          </Row>
        </Show >
        <Show when={!projects?.data?.projects?.length}>
          <h4 className="text-white">No Projects to display</h4>
        </Show>
      </Fragment>
    )
  }, [projects?.data])

  const createProject = async () => {
    const { hasConfirmed, value } = await prompt("Your Project name")

    if (hasConfirmed && value) {
      try {
        const response = await axios.post(endPoints.insightsCreateProject, { name: value })
        toast.success("Project Created")
        router.push(`/products/insights/project?projectId=${response.data.project._id}`)
      }

      catch (error: any) {
        toast.error("Unable to create project")
      }
    }
  }

  return (
    <Fragment>
      <Show when={!projects.isLoading && !products.isLoading}>
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
            <Button variant="primary" onClick={createProject}><PlusCircledIcon className="icon-left" />Create Project</Button>
          </Hero>
          {displayProjects()}
        </Container>
      </Show>
      <Show when={projects.isLoading || products.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Fragment>
  )
}
