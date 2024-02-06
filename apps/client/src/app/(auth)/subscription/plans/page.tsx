"use client"
import Pricing from "@/components/pricing"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { useContext } from "react"
import { Container } from "react-bootstrap"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)

  return (
    <Container>
      <Pricing readonly={userState.hasActiveSubscription} />
    </Container>
  )
}