"use client"
import { FC, createContext, useCallback, useMemo, useReducer } from "react"
import { GlobalState, Actions, ActionsMap, GlobalReducer } from "./globalstate.reducer"
import { GlobalStateProviderProps, UserState } from "@/types/Types"

export type Dispatcher = <Type extends Actions["type"], Payload extends ActionsMap[Type]>(type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type GlobalContextInterface = readonly [GlobalState, Dispatcher]

const initialState: { userState: UserState, globalSearchString: string } = {
  userState: {
    userId: "",
    privateKey: "",
    email: "",
    role: "",
    selectedPlan: "No Subscription",
    clientId: "",
    clientSecret: "",
    expiresAt: "",
    trialAvailable: false,
    selectedWorkspaceId: "",
    selectedWorkspaceName: "",
    remainingCredits: 0,
    refreshId: "ABC"
  },

  globalSearchString: ""
}

export const GlobalContext = createContext<GlobalContextInterface>([initialState, ((): void => undefined)])

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, _dispatch] = useReducer(GlobalReducer, initialState)
  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }, [])
  const values = useMemo(() => [state, dispatch] as GlobalContextInterface, [state])
  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
}