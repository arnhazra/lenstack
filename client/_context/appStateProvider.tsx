"use client"
import { FC, createContext, useCallback, useMemo, useReducer } from "react"
import { AppState, Actions, ActionsMap, AppReducer } from "./appReducer"
import { AppStateProviderProps } from "@/_types/Types"

export type Dispatcher = <Type extends Actions["type"], Payload extends ActionsMap[Type]>(type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type AppContextInterface = readonly [AppState, Dispatcher]

const initialState = {
  userState: {
    userId: "",
    privateKey: "",
    email: "",
    role: "",
    selectedPlan: "No Subscription",
    apiKey: "",
    subscriptionValidUpto: "",
    trialAvailable: false
  },
}

export const AppContext = createContext<AppContextInterface>([initialState, ((): void => undefined)])

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
  const [state, _dispatch] = useReducer(AppReducer, initialState)
  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }, [])
  const values = useMemo(() => [state, dispatch] as AppContextInterface, [state])
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}