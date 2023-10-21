"use client"
import GenericAppCard from "@/_components/GenericAppCard"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { CruxQlDb, GenericAppCardInterface } from "@/_types/Types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const availableDbList = useFetch("mydblist", endPoints.cruxqlGetMyDbList, HTTPMethods.POST)

  const databasesToDisplay = availableDbList?.data?.myDbList?.map((db: CruxQlDb) => {
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
      <h4 className="dashboard-header">My Databases list</h4>
      <Link className="btn" href={"/apps/cruxql"}>View Store <ArrowRightIcon className="icon-right" /></Link>
      <Row>
        {databasesToDisplay}
      </Row>
    </Container>
  )
}
