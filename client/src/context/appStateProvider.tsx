"use client"
import { FC, createContext, useCallback, useMemo, useReducer } from "react"
import { AppState, Actions, ActionsMap, AppReducer } from "./appReducer"
import { AppStateProviderProps, UserState } from "@/types/Types"

export type Dispatcher = <Type extends Actions["type"], Payload extends ActionsMap[Type]>(type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type AppContextInterface = readonly [AppState, Dispatcher]

const initialState: { userState: UserState, globalSearchString: string } = {
  userState: {
    userId: "",
    privateKey: "",
    email: "",
    role: "",
    selectedPlan: "No Subscription",
    apiKey: "",
    expiresAt: "",
    trialAvailable: false,
    selectedWorkspaceId: "",
    selectedWorkspaceName: "",
    remainingCredits: 0,
    refreshId: "ABC"
  },

  globalSearchString: ""
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