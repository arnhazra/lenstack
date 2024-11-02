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
import Sidebar from "./(components)/sidebar"
import { Organization, Subscription, User } from "@/types"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [{ refreshId }, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response: {
          user: User
          organization: Organization
          subscription: Subscription | null
        } = await ky
          .get(endPoints.userDetails, { timeout: FETCH_TIMEOUT })
          .json()
        const organizations: Organization[] = await ky
          .get(endPoints.organization, { timeout: FETCH_TIMEOUT })
          .json()
        localStorage.setItem("clientId", response.organization.clientId)
        localStorage.setItem("clientSecret", response.organization.clientSecret)
        dispatch("setUser", response.user)
        dispatch("setSelectedOrg", response.organization)
        dispatch("setSubscription", response.subscription)
        dispatch("setOrgs", organizations)
        setAuthorized(true)
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            setAuthorized(false)
          } else {
            toast({
              title: uiConstants.notification,
              description: (
                <p className="text-zinc-600">
                  {uiConstants.connectionErrorMessage}
                </p>
              ),
            })
          }
        } else {
          toast({
            title: uiConstants.notification,
            description: (
              <p className="text-zinc-600">
                {uiConstants.connectionErrorMessage}
              </p>
            ),
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (localStorage.getItem("accessToken")) {
      getUserDetails()
    } else {
      setAuthorized(false)
      setLoading(false)
    }
  }, [refreshId, isAuthorized])

  const appLayout = (
    <>
      <Sidebar />
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className="p-4 sm:px-6 sm:py-0">{children}</div>
        </div>
      </div>
    </>
  )

  return (
    <Suspense condition={!isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!isAuthorized} fallback={appLayout}>
        <AuthProvider onAuthorized={(auth: boolean) => setAuthorized(auth)} />
      </Suspense>
    </Suspense>
  )
}
