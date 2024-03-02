export interface UserState {
  userId: string
  privateKey: string
  email: string
  role: string
  selectedPlan: string
  clientId: string
  clientSecret: string
  createdAt: string
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
  setUserState: Partial<UserState>
  setAppState: Partial<AppState>
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