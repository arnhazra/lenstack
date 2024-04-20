"use client"
import { Button } from "@/components/ui/button"
import { endPoints } from "@/constants/api-endpoints"
import { loadStripe } from '@stripe/stripe-js'
import axios from "axios"

export default function page() {
  const checkout = async () => {
    const stripe = await loadStripe("pk_test_51P5Q94SJwCI16KpcELsnIAvQbLJHVPPiIm5pmEaz0X8HUnzdgAIj82cbwqpq4oaK2aZyRd64XtNZ2vjFu9dfPn8E00LIOea6kT")
    const body = {
      products: "Subscription"
    }

    const response = await axios.post(endPoints.createCheckoutSession, body)
    const result = stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
  }

  return (
    <Button onClick={checkout}>Check Out</Button>
  )
}
