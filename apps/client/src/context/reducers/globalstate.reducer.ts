export interface UserState {
  userId: string
  privateKey: string
  email: string
  role: string
  selectedPlan: string
  clientId: string
  clientSecret: string
  expiresAt: string
  selectedWorkspaceId: string
  selectedWorkspaceName: string
  remainingCredits: number | string
  hasActiveSubscription: boolean,
  isAuthorized: boolean
}

export interface AppState {
  refreshId: string,
  globalSearchString: string
}

export type GlobalState = {
  userState: UserState,
  appState: AppState
}

export type ActionsMap = {
  setUserState: { [key: string]: string | boolean }
  setAppState: { [key: string]: string | boolean }
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key
    payload: ActionsMap[Key]
  }
}[keyof ActionsMap]

export const GlobalReducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "setUserState":
      return {
        ...state, userState: { ...state.userState, ...action.payload }
      }

    case "setAppState":
      return {
        ...state, appState: { ...state.appState, ...action.payload }
      }

    default:
      return state
  }
}