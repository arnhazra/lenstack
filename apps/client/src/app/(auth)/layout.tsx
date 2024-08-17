"use client"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { ReactNode, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"
import AuthProvider from "./auth"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)
  const { toast } = useToast()

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(endPoints.userDetails)
        const userId = response.data.user._id
        const { email, role, selectedOrgId, reduceCarbonEmissions, activityLog } = response.data.user
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
        dispatch("setUserState", { userId, email, role, selectedOrgId, selectedOrganizationName, clientId, clientSecret, hasActiveSubscription, reduceCarbonEmissions, activityLog })
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
              title: uiConstants.notification,
              description: <p className="text-slate-600">{uiConstants.connectionErrorMessage}</p>
            })
          }
        }

        else {
          toast({
            title: uiConstants.notification,
            description: <p className="text-slate-600">{uiConstants.connectionErrorMessage}</p>
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
  }, [userState.refreshId, isAuthorized])

  return (
    <Suspense condition={!isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!isAuthorized} fallback={children}>
        <AuthProvider onAuthorized={(auth: boolean) => setAuthorized(auth)} />
      </Suspense >
    </Suspense >
  )
}
