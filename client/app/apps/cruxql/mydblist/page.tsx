"use client"
import DbCard from "@/_components/DbCard"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { CruxQlDb } from "@/_types/Types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const availableDbList = useFetch("mydblist", endPoints.cruxqlGetMyDbList, HTTPMethods.POST)

  return (
    <Container>
      <h4 className="dashboard-header">My Databases list</h4>
      <Link className="btn" href={"/apps/cruxql"}>View Store <ArrowRightIcon className="icon-right" /></Link>
      <Row>
        {availableDbList?.data?.myDbList?.map((db: CruxQlDb) => <DbCard key={db._id} db={db} />)}
      </Row>
    </Container>
  )
}
