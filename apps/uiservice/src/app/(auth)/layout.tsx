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
        const { _id: userId, email, name, role, walletBalance, computeTier, reduceCarbonEmissions, activityLog, selectedOrgId } = response.data.user
        const { name: selectedOrgName, clientId, clientSecret } = response.data.organization
        localStorage.setItem("clientId", clientId)
        localStorage.setItem("clientSecret", clientSecret)
        dispatch("setUserState", { userId, email, name, role, walletBalance, computeTier, reduceCarbonEmissions, activityLog, selectedOrgId, selectedOrgName, clientId, clientSecret })
        dispatch("setUserState", { isAuthorized: true })
        setAuthorized(true)
      }

      catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            dispatch("setUserState", { isAuthorized: false })
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
