"use client"
import { Fragment } from "react"
import endPoints from "@/_constants/apiEndpoints"
import Show from "@/_components/Show"
import { Card, Container, Row, Table, Col } from "react-bootstrap"
import Loading from "@/_components/Loading"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import moment from "moment"
import Link from "next/link"
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

export default function Page() {
  const portfolios = useFetch("portfolios", endPoints.wealthnowGetPortfoliosEndpoint, HTTPMethods.POST)

  const portfoliosToDisplay = portfolios?.data?.portfolios?.map((portfolio: any) => {
    return (
      <tr key={portfolio._id}>
        <td>{portfolio.name}</td>
        <td>{moment(portfolio.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link href={`/apps/wealthnow/portfolio?portfolioid=${portfolio._id}`}>Open Portfolio<ExternalLinkIcon className="icon-right" /></Link></td>
      </tr>
    )
  })

  return (
    <Fragment>
      <Show when={!portfolios.isLoading}>
        <Container>
          <Link className="btn" href={"/apps/wealthnow/createportfolio"}>Create Portfolio<ArrowRightIcon className="icon-right" /></Link>
          <Show when={portfolios?.data?.portfolios?.length > 0}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <Card className="p-4 mb-2 app-card-wealthnow">
                  <p className="lead text-capitalize">Consolidated Asset</p>
                  <p className="display-6 text-capitalize">₹ {portfolios?.data?.consolidatedAsset.toLocaleString()}</p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <Card className="p-4 mb-2 app-card-wealthnow">
                  <p className="lead text-capitalize">Total Portfolios</p>
                  <p className="display-6 text-capitalize">{portfolios?.data?.portfolios.length}</p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <Card className="p-4 mb-2 app-card-wealthnow">
                  <p className="lead text-capitalize">Oldest Portfolio</p>
                  <p className="display-6 text-capitalize">{portfolios?.data?.portfolios[0]?.name ?? ""}</p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                <Card className="p-4 mb-2 app-card-wealthnow">
                  <p className="lead text-capitalize">Latest Portfolio</p>
                  <p className="display-6 text-capitalize">{portfolios?.data?.portfolios[portfolios?.data?.portfolios.length - 1]?.name ?? ""}</p>
                </Card>
              </Col>
            </Row>
            <h4 className="text-white mt-2">Portfolios</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Portfolio Name</th>
                  <th>Created At</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {portfoliosToDisplay}
              </tbody>
            </Table>
          </Show>
          <Show when={portfolios?.data?.portfolios?.length === 0}>
            <div className="box">
              <p className="branding">Portfolios</p>
              <p className="lead">No Portfolios to display</p>
            </div>
          </Show>
        </Container>
      </Show >
      <Show when={portfolios.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
