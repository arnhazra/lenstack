"use client"
import Hero from "@/components/hero-component"
import InfoPanel from "@/components/infopanel-component"
import SubHeader from "@/components/sub-header-component"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/use-fetch"
import { BellIcon, DashboardIcon } from "@radix-ui/react-icons"
import moment from "moment"
import { useRouter } from "next/navigation"
import { Fragment, useCallback } from "react"
import { Container } from "react-bootstrap"

export default function Page() {
  const router = useRouter()
  const activities = useFetch("get-activities", endPoints.getAllActivities, HTTPMethods.GET, {}, true)

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
      <SubHeader>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-white">Activities</h4>
          <div className="ml-auto">
            <DashboardIcon className="icon-subheader" onClick={() => router.push("/dashboard")} />
          </div>
        </div>
      </SubHeader>
      <Container>
        <Hero>
          {displayActivities()}
        </Hero>
      </Container>
    </Fragment>
  )
}
