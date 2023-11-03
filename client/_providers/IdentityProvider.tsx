"use client"
import Header from "@/_components/Header"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Constants from "@/_constants/appConstants"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import IdentityGuard from "./IdentityGuard"

export default function IdentityProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [, dispatch] = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const [isAuthorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      (async () => {
        try {
          const response = await axios.post(endPoints.userDetailsEndpoint)
          const userId = response.data.user._id
          const { email, privateKey, role, trialAvailable } = response.data.user

          if (response.data.subscription) {
            const { selectedPlan, apiKey, expiresAt } = response.data.subscription
            localStorage.setItem("apiKey", apiKey)
            dispatch("setUserState", { selectedPlan, apiKey, subscriptionValidUpto: expiresAt })
          }

          dispatch("setUserState", { userId, email, privateKey, role, trialAvailable })
          setAuthorized(true)
        }

        catch (error: any) {
          if (error.response) {
            if (error.response.status === 401) {
              setAuthorized(false)
            }

            else {
              toast.error(Constants.ConnectionErrorMessage)
            }
          }

          else {
            toast.error(Constants.ConnectionErrorMessage)
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
  }, [isAuthorized])

  const onsignOut = () => {
    localStorage.clear()
    router.push("/")
    setAuthorized(false)
  }

  return (
    <Fragment>
      <nav className="header">
        <Header onSignOut={(): void => onsignOut()} isAuthorized={isAuthorized} />
      </nav>
      <Show when={isLoading}>
        <Loading />
      </Show>
      <Show when={!isLoading}>
        <Show when={isAuthorized}>
          {children}
        </Show>
        <Show when={!isAuthorized}>
          <Show when={pathname === "/"}>
            {children}
          </Show>
          <Show when={pathname !== "/"} >
            <IdentityGuard onIdentitySuccess={(): void => setAuthorized(true)} onIdentityFailure={(): void => setAuthorized(false)} />
          </Show>
        </Show>
      </Show>
    </Fragment>
  )
}
