export interface UserState {
  userId: string
  email: string
  role: string
  selectedPlan: string
  clientId: string
  clientSecret: string
  createdAt: string
  expiresAt: string
  selectedOrgId: string
  selectedOrganizationName: string
  remainingCredits: number | string
  hasActiveSubscription: boolean,
  isAuthorized: boolean,
  reduceCarbonEmissions: boolean,
  usageInsights: boolean
}

export type GlobalState = {
  userState: UserState,
}

export type ActionsMap = {
  setUserState: Partial<UserState>
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

    default:
      return state
  }
}