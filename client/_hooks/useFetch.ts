"use client"
import axios, { Method } from "axios"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"
import { useRouter } from "next/navigation"

function useFetch(queryKey: string, queryUrl: string, method: Method, requestBody?: object) {
    const router = useRouter()

    const fetchDataFunction = async () => {
        const { data } = await axios({ method, url: queryUrl, data: requestBody })
        return data
    }

    const { error, data, isLoading } = useQuery(
        [queryKey, requestBody],
        () => fetchDataFunction(),
        {
            enabled: true,
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay: 2500,
            onError(err: any) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem("accessToken")
                    router.push("/")
                }

                toast.error(`${Constants.ToastError} fetching ${queryKey}`)
            },
        },
    )

    return { error, data, isLoading }
}

export default useFetch