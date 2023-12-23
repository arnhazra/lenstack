export interface UserState {
  userId: string
  privateKey: string
  email: string
  role: string
  selectedPlan: string
  clientId: string
  clientSecret: string
  expiresAt: string
  trialAvailable: boolean
  selectedWorkspaceId: string
  selectedWorkspaceName: string
  remainingCredits: number | string
  refreshId: string,
  hasActiveSubscription: boolean
}

export type GlobalState = {
  userState: UserState,
  globalSearchString: string
}

export type ActionsMap = {
  setUserState: { [key: string]: string | boolean }
  setGlobalSearchString: string
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

    case "setGlobalSearchString":
      return {
        ...state, globalSearchString: action.payload
      }

    default:
      return state
  }
}