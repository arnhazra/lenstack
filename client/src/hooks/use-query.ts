"use client"
import axios, { Method } from "axios"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"

export default function useQuery(queryKey: string, queryUrl: string, method: Method, requestBody?: object, queryId?: string) {
  const fetchDataFunction = async () => {
    const { data } = await axios({ method, url: queryUrl, data: requestBody })
    return data
  }

  const { error, data, isLoading } = useReactQuery({
    queryKey: [queryKey, requestBody, queryId, queryUrl],
    queryFn: () => fetchDataFunction(),
    retry: 2,
    retryDelay: 2500,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    enabled: true,
  })

  if (error) {
    toast.error(`${uiConstants.toastError} fetching ${queryKey}`)
  }

  return { error, data, isLoading }
}