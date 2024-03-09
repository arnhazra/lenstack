"use client"
import axios, { Method } from "axios"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"

export default function useQuery(queryKey: string[], queryUrl: string, method: Method, requestBody?: object) {
  const [{ userState }] = useContext(GlobalContext)
  const fetchDataFunction = async () => {
    const { data } = await axios({ method, url: queryUrl, data: requestBody })
    return data
  }

  const { error, data, isLoading } = useReactQuery({
    queryKey: [...queryKey, requestBody, queryUrl],
    queryFn: () => fetchDataFunction(),
    refetchOnWindowFocus: userState.useOptimizedAPICalls,
    refetchInterval: userState.useOptimizedAPICalls ? false : 60000
  })

  if (error) {
    toast.error(`${uiConstants.toastError} fetching ${queryKey[0]}`)
  }

  return { error, data, isLoading }
}