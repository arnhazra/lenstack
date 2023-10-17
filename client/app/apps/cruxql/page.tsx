"use client"
import DbCard from "@/_components/DbCard"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { AppContext } from "@/_context/appStateProvider"
import useFetch from "@/_hooks/useFetch"
import { CruxQlDb } from "@/_types/Types"
import React, { useContext } from "react"
import { Container, Row } from "react-bootstrap"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const availableDbList = useFetch("swapstreamtokenconfig", endPoints.cruxqlGetAvailableDbList, HTTPMethods.POST)

  return (
    <Container>
      <h4 className="dashboard-header">Choose and spin up your DB instantly !</h4>
      <Row>
        {availableDbList?.data?.dbList?.map((db: CruxQlDb) => <DbCard key={db._id} db={db} />)}
      </Row>
    </Container>
  )
}
