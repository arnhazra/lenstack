"use client"
import ky from "ky"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { uiConstants } from "@/shared/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import { toast } from "@/shared/components/ui/use-toast"
import HTTPMethods from "@/shared/constants/http-methods"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"

export default function useQuery(
  queryKey: string[],
  queryUrl: string,
  method: HTTPMethods,
  requestBody?: object
) {
  const [{ user }] = useContext(GlobalContext)

  const fetchDataFunction = async () => {
    const data: any = await ky(queryUrl, {
      method,
      json: requestBody,
      timeout: FETCH_TIMEOUT,
    }).json()
    return data
  }

  const { error, data, isLoading, refetch, isRefetching } = useReactQuery({
    queryKey: [...queryKey, user.selectedOrgId],
    queryFn: fetchDataFunction,
    refetchOnWindowFocus: !user.reduceCarbonEmissions,
    refetchInterval: user.reduceCarbonEmissions ? false : 30000,
  })

  if (error) {
    toast({
      title: uiConstants.notification,
      description: `${uiConstants.toastError} fetching ${queryKey[0]}`,
    })
  }

  return { error, data, isLoading, refetch, isRefetching }
}
