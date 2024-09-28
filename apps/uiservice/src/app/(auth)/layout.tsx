"use client"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import ky from "ky"
import { ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"
import AuthProvider from "./auth"
import { FETCH_TIMEOUT } from "@/lib/fetch-timeout"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (!userState.refreshId) {
          setLoading(true)
        }
        const response: any = await ky.get(endPoints.userDetails, { timeout: FETCH_TIMEOUT }).json()
        const organizations: any = await ky.get(endPoints.organization, { timeout: FETCH_TIMEOUT }).json()
        const { _id: userId, email, name, role, walletBalance, computeTier, reduceCarbonEmissions, activityLog, selectedOrgId } = response.user
        const { name: selectedOrgName, clientId, clientSecret } = response.organization
        localStorage.setItem("clientId", clientId)
        localStorage.setItem("clientSecret", clientSecret)
        dispatch("setUserState", { userId, email, name, role, walletBalance, computeTier, reduceCarbonEmissions, activityLog, selectedOrgId, selectedOrgName, clientId, clientSecret })
        dispatch("setUserState", { isAuthorized: true })
        dispatch("setOrgState", organizations)
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
              description: <p className="text-zinc-600">{uiConstants.connectionErrorMessage}</p>
            })
          }
        }

        else {
          toast({
            title: uiConstants.notification,
            description: <p className="text-zinc-600">{uiConstants.connectionErrorMessage}</p>
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

  const appLayout = (
    <div className="flex min-h-screen w-full flex-col -mt-4">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        {children}
      </div>
    </div>
  )

  return (
    <Suspense condition={!isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!isAuthorized} fallback={appLayout}>
        <AuthProvider onAuthorized={(auth: boolean) => setAuthorized(auth)} />
      </Suspense >
    </Suspense >
  )
}
