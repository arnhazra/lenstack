"use client"
import { ReactNode, createContext, useReducer } from "react"
import { GlobalState, Actions, ActionsMap, GlobalReducer, UserState, AppState } from "../reducers/globalstate.reducer"

export type Dispatcher = <Type extends keyof ActionsMap>(type: Type, payload: ActionsMap[Type]) => void

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
    createdAt: "",
    expiresAt: "",
    selectedWorkspaceId: "",
    selectedWorkspaceName: "",
    remainingCredits: 0,
    hasActiveSubscription: false,
    isAuthorized: false
  },

  appState: {
    refreshId: "ABC",
    globalSearchString: ""
  },
}

export const GlobalContext = createContext<GlobalContextInterface>([initialState, ((): void => undefined)])

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(GlobalReducer, initialState)
  const dispatch: Dispatcher = (type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }
  const values: GlobalContextInterface = [state, dispatch]
  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
}