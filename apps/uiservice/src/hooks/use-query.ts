"use client"
import ky from "ky"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { uiConstants } from "@/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import { toast } from "@/components/ui/use-toast"
import HTTPMethods from "@/constants/http-methods"

export default function useQuery(queryKey: string[], queryUrl: string, method: HTTPMethods, requestBody?: object) {
  const [{ userState }] = useContext(GlobalContext)

  const fetchDataFunction = async () => {
    const data: any = await ky(queryUrl, { method, json: requestBody, timeout: 60000 }).json()
    return data
  }

  const { error, data, isLoading, refetch, isRefetching } = useReactQuery({
    queryKey: [...queryKey, userState.selectedOrgId],
    queryFn: fetchDataFunction,
    refetchOnWindowFocus: !userState.reduceCarbonEmissions,
    refetchInterval: userState.reduceCarbonEmissions ? false : 30000
  })

  if (error) {
    toast({
      title: uiConstants.notification,
      description: `${uiConstants.toastError} fetching ${queryKey[0]}`
    })
  }

  return { error, data, isLoading, refetch, isRefetching }
}