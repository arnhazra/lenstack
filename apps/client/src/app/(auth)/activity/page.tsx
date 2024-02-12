"use client"
import Error from "@/components/error"
import Grid from "@/components/grid"
import Hero from "@/components/hero"
import InfoPanel from "@/components/infopanel/infopanel"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { BellIcon } from "@radix-ui/react-icons"
import { formatDistanceToNow } from "date-fns"
import { useCallback } from "react"
import { Col, Container } from "react-bootstrap"

export default function Page() {
  const activities = useQuery(["activities"], endPoints.getAllActivities, HTTPMethods.GET)

  const displayActivities = useCallback(() => {
    const activitiesToDisplay = activities?.data?.activities?.map((activity: any) => {
      return (
        <Col key={activity._id}>
          <InfoPanel
            infoIcon={<BellIcon />}
            infoName={activity.activityDescription}
            infoValue={formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
          />
        </Col>
      )
    })

    return (
      <Grid>
        {activitiesToDisplay}
      </Grid>
    )
  }, [activities?.data])

  return (
    <Suspense condition={!activities.isLoading} fallback={<Loading />}>
      <Suspense condition={!activities.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding text-capitalize">Activities</p>
            {displayActivities()}
          </Hero>
        </Container>
      </Suspense>
    </Suspense>
  )
}
