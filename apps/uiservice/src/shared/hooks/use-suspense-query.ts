"use client"
import ky from "ky"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import HTTPMethods from "@/shared/constants/http-methods"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"

export default function useQueryWithSuspense(
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

  return useSuspenseQuery({
    queryKey: [...queryKey, user.selectedWorkspaceId],
    queryFn: fetchDataFunction,
    refetchOnWindowFocus: !user.reduceCarbonEmissions,
    refetchInterval: user.reduceCarbonEmissions ? false : 30000,
  })
}
