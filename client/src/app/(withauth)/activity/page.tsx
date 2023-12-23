"use client"
import Hero from "@/components/hero-component"
import InfoPanel from "@/components/infopanel-component"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/use-fetch"
import { BellIcon } from "@radix-ui/react-icons"
import moment from "moment"
import { Fragment, useCallback } from "react"
import { Container } from "react-bootstrap"

export default function Page() {
  const activities = useFetch("get-activities", endPoints.getAllActivities, HTTPMethods.GET)

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
      <Show when={!activities.isLoading}>
        <Container>
          <Hero>
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
