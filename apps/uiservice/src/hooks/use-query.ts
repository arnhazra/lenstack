"use client"
import axios, { Method } from "axios"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { uiConstants } from "@/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { toast } from "@/components/ui/use-toast"

export default function useQuery(queryKey: string[], queryUrl: string, method: Method, requestBody?: object) {
  const [{ userState }] = useContext(GlobalContext)
  const fetchDataFunction = async () => {
    const { data } = await axios({ method, url: queryUrl, data: requestBody })
    return data
  }

  const { error, data, isLoading, refetch } = useReactQuery({
    queryKey: [...queryKey, requestBody, queryUrl, userState.selectedOrgId],
    queryFn: () => fetchDataFunction(),
    refetchOnWindowFocus: !userState.reduceCarbonEmissions,
    refetchInterval: userState.reduceCarbonEmissions ? false : 30000
  })

  if (error) {
    toast({
      title: uiConstants.notification,
      description: `${uiConstants.toastError} fetching ${queryKey[0]}`
    })
  }

  return { error, data, isLoading, refetch }
}