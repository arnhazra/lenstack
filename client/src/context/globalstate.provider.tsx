"use client"
import { ReactNode, createContext, useCallback, useMemo, useReducer } from "react"
import { GlobalState, Actions, ActionsMap, GlobalReducer, UserState, AppState } from "./globalstate.reducer"

export type Dispatcher = <Type extends Actions["type"], Payload extends ActionsMap[Type]>(type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type GlobalContextInterface = readonly [GlobalState, Dispatcher]

const initialState: { userState: UserState, appState: AppState } = {
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
    hasActiveSubscription: false
  },

  appState: {
    refreshId: "ABC",
    globalSearchString: ""
  },
}

export const GlobalContext = createContext<GlobalContextInterface>([initialState, ((): void => undefined)])

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(GlobalReducer, initialState)
  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }, [])
  const values = useMemo(() => [state, dispatch] as GlobalContextInterface, [state])
  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
}