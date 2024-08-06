"use client"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { ReactNode, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import eventEmitter from "@/events/eventEmitter"
import AuthProvider from "./auth"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)
  const { toast } = useToast()

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(endPoints.userDetails)
        const userId = response.data.user._id
        const { email, role, selectedOrgId, reduceCarbonEmissions, usageInsights } = response.data.user
        const { name: selectedOrganizationName, clientId, clientSecret } = response.data.organization
        const hasActiveSubscription = response.data.hasActiveSubscription

        if (response.data.subscription) {
          const { selectedPlan, createdAt, expiresAt, remainingCredits } = response.data.subscription
          dispatch("setUserState", { selectedPlan, createdAt, expiresAt, remainingCredits })
        }

        else {
          dispatch("setUserState", { selectedPlan: "No Subscription", expiresAt: "" })
        }

        localStorage.setItem("clientId", clientId)
        localStorage.setItem("clientSecret", clientSecret)
        dispatch("setUserState", { userId, email, role, selectedOrgId, selectedOrganizationName, clientId, clientSecret, hasActiveSubscription, reduceCarbonEmissions, usageInsights })
        dispatch("setUserState", { isAuthorized: true })
        setAuthorized(true)
      }

      catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            setAuthorized(false)
          }

          else {
            toast({
              title: "Notification",
              description: <p className="text-neutral-600">{uiConstants.connectionErrorMessage}</p>
            })
          }
        }

        else {
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{uiConstants.connectionErrorMessage}</p>
          })
        }
      }

      finally {
        setLoading(false)
      }
    }

    if (localStorage.getItem("accessToken")) {
      getUserDetails()
    }

    else {
      setAuthorized(false)
      setLoading(false)
    }

    eventEmitter.onEvent("OrganizationChangeEvent", (): Promise<void> => getUserDetails())

    return () => {
      eventEmitter.offEvent("OrganizationChangeEvent", (): Promise<void> => getUserDetails())
    }
  }, [isAuthorized])

  return (
    <Suspense condition={!isLoading} fallback={<Loading />}>
      <Suspense condition={!isAuthorized} fallback={children}>
        <AuthProvider onAuthorized={(auth: boolean) => setAuthorized(auth)} />
      </Suspense >
    </Suspense >
  )
}
