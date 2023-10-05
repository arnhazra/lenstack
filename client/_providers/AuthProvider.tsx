"use client"
import Header from "@/_components/Header"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Constants from "@/_constants/appConstants"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import { usePathname } from "next/navigation"
import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import AuthGuard from "./AuthGuard"

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [, dispatch] = useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      (async () => {
        try {
          const response = await axios.post(endPoints.userDetailsEndpoint)
          const userid = response.data.user._id
          const { name, email, privateKey, role, trialAvailable } = response.data.user

          if (response.data.subscription) {
            const { selectedPlan, apiKey, tokenId, expiresAt } = response.data.subscription
            dispatch("setUserState", { selectedPlan, apiKey, tokenId, subscriptionValidUpto: expiresAt })
          }

          dispatch("setUserState", { userid, name, email, privateKey, role, trialAvailable })
          setAuthenticated(true)
        }

        catch (error: any) {
          if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
              localStorage.removeItem("accessToken")
              setAuthenticated(false)
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
      setAuthenticated(false)
      setLoading(false)
    }
  }, [pathname, isAuthenticated])

  return (
    <Fragment>
      <Show when={isLoading}>
        <Header />
        <Loading />
      </Show>
      <Show when={!isLoading}>
        <Show when={isAuthenticated}>
          {children}
        </Show>
        <Show when={!isAuthenticated}>
          <Show when={pathname === "/"}>
            {children}
          </Show>
          <Show when={pathname !== "/"} >
            <Header />
            <AuthGuard onAuthSuccess={(): void => setAuthenticated(true)} onAuthFailure={(): void => setAuthenticated(false)} />
          </Show>
        </Show>
      </Show>
    </Fragment>
  )
}
