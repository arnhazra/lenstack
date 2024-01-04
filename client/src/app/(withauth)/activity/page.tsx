"use client"
import Hero from "@/components/hero"
import InfoPanel from "@/components/infopanel"
import Loading from "@/components/loading"
import Show from "@/components/show"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { BellIcon } from "@radix-ui/react-icons"
import moment from "moment"
import { Fragment, useCallback } from "react"
import { Col, Container, Row } from "react-bootstrap"

export default function Page() {
  const activities = useQuery("get-activities", endPoints.getAllActivities, HTTPMethods.GET)

  const displayActivities = useCallback(() => {
    const activitiesToDisplay = activities?.data?.activities?.map((activity: any) => {
      return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4" key={activity._id}>
          <InfoPanel key={activity._id} infoIcon={<BellIcon />} infoName={activity.activityDescription} infoValue={moment(activity.createdAt).fromNow()} />
        </Col>
      )
    })

    return (
      <Row>
        {activitiesToDisplay}
      </Row>
    )
  }, [activities?.data])

  return (
    <Fragment>
      <Show when={!activities.isLoading}>
        <Container>
          <Hero>
            <p className="branding text-capitalize">Activities</p>
            {displayActivities()}
          </Hero>
        </Container>
      </Show>
      <Show when={activities.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
