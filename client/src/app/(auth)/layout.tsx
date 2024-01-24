"use client"
import Header from "@/components/header"
import Loading from "@/components/loading"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import axios from "axios"
import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import IdentityGuard from "@/components/identity-guard"
import Suspense from "@/components/suspense"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [{ appState }, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      (async () => {
        try {
          const response = await axios.get(endPoints.userDetails)
          const userId = response.data.user._id
          const { email, privateKey, role, trialAvailable, selectedWorkspaceId } = response.data.user
          const { name: selectedWorkspaceName, clientId, clientSecret } = response.data.workspace
          const hasActiveSubscription = response.data.hasActiveSubscription

          if (response.data.subscription) {
            const { selectedPlan, expiresAt, remainingCredits } = response.data.subscription
            dispatch("setUserState", { selectedPlan, expiresAt, remainingCredits })
          }

          else {
            dispatch("setUserState", { selectedPlan: "No Subscription", expiresAt: "" })
          }

          localStorage.setItem("clientId", clientId)
          localStorage.setItem("clientSecret", clientSecret)
          dispatch("setUserState", { userId, email, privateKey, role, trialAvailable, selectedWorkspaceId, selectedWorkspaceName, clientId, clientSecret, hasActiveSubscription })
          setAuthorized(true)
        }

        catch (error: any) {
          if (error.response) {
            if (error.response.status === 401) {
              setAuthorized(false)
            }

            else {
              toast.error(uiConstants.connectionErrorMessage)
            }
          }

          else {
            toast.error(uiConstants.connectionErrorMessage)
          }
        }

        finally {
          setLoading(false)
        }
      })()
    }

    else {
      setAuthorized(false)
      setLoading(false)
    }
  }, [isAuthorized, appState.refreshId])

  return (
    <Fragment>
      <nav className="header">
        <Header isAuthorized={isAuthorized} />
      </nav>
      <Suspense condition={!isLoading} fallback={<Loading />}>
        <Suspense condition={isAuthorized} fallback={<IdentityGuard onIdentitySuccess={(): void => setAuthorized(true)} onIdentityFailure={(): void => setAuthorized(false)} />}>
          {children}
        </Suspense>
      </Suspense>
    </Fragment>
  )
}
