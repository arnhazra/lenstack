"use client"
import axios, { Method } from "axios"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"

function useFetch(queryKey: string, queryUrl: string, method: Method, requestBody?: object, isRealtime?: boolean, queryId?: string) {
  const fetchDataFunction = async () => {
    const { data } = await axios({ method, url: queryUrl, data: requestBody })
    return data
  }

  const { error, data, isLoading } = useQuery({
    queryKey: [queryKey, requestBody, queryId],
    queryFn: () => fetchDataFunction(),
    retry: 2,
    retryDelay: 2500,
    refetchOnWindowFocus: isRealtime,
    refetchInterval: isRealtime ? 60000 : false,
    enabled: true,
  })

  if (error) {
    toast.error(`${Constants.ToastError} fetching ${queryKey}`)
  }

  return { error, data, isLoading }
}

export default useFetch