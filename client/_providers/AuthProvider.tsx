"use client"
import Loading from "@/_components/Loading"
import endPoints from "@/_constants/apiEndpoints"
import { AppContext } from "@/_context/appStateProvider"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect, useState } from "react"

export default function AuthProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [, dispatch] = useContext(AppContext)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Object.hasOwn(localStorage, "accessToken")) {
            if (pathname === "/" || pathname === "/auth") {
                router.push("/dashboard")
            }

            else {
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
                        setLoading(false)
                    }

                    catch (error: any) {
                        localStorage.removeItem("accessToken")
                        setLoading(false)
                        router.push(`/auth?redirect=${pathname.slice(1)}`)
                    }
                })()
            }
        }

        else {
            if (pathname !== "/" && pathname !== "/auth") {
                router.push(`/auth?redirect=${pathname.slice(1)}`)
                setLoading(false)
            }
        }
    }, [pathname])

    return (
        !isLoading ? <>{children}</> : <Loading />
    )
}
