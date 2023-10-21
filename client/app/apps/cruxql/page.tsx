"use client"
import GenericAppCard from "@/_components/GenericAppCard"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { CruxQlDb, GenericAppCardInterface } from "@/_types/Types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const availableDbList = useFetch("availableDbList", endPoints.cruxqlGetAvailableDbList, HTTPMethods.POST)

  const databasesToDisplay = availableDbList?.data?.dbList?.map((db: CruxQlDb) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: db.region,
      className: "cruxql",
      headerText: db.cloudPlatform,
      footerText: `Enable one-click deployment of ${db.cloudPlatform + " " + db.region} MongoDB cluster with data privacy, ensuring cross-regional availability.`,
      redirectUri: `/apps/cruxql/db?dbId=${db._id}`
    }

    return <GenericAppCard key={db._id} genericAppCardProps={genericAppCardProps} />
  })

  return (
    <Container>
      <Show when={!availableDbList.isLoading}>
        <h4 className="dashboard-header">Choose and spin up your DB instantly !</h4>
        <Link className="btn" href={"/apps/cruxql/mydblist"}>View My Db List <ArrowRightIcon className="icon-right" /></Link>
        <Row>
          {databasesToDisplay}
        </Row>
      </Show>
      <Show when={availableDbList.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}
