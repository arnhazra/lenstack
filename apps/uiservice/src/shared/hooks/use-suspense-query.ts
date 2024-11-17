"use client"
import ky from "ky"
import useSWR from "swr"
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

  return useSWR([...queryKey, user.selectedWorkspaceId], fetchDataFunction, {
    refreshWhenHidden: !user.reduceCarbonEmissions,
    refreshInterval: user.reduceCarbonEmissions ? 0 : 30000,
    suspense: true,
  })
}
