import { Organization } from "@/types/Types"

export interface UserState {
  userId: string
  email: string
  name: string
  role: string
  walletBalance: number,
  computeTier: string
  reduceCarbonEmissions: boolean,
  activityLog: boolean,
  selectedOrgId: string
  selectedOrgName: string
  clientId: string
  clientSecret: string
  isAuthorized: boolean,
  refreshId: string,
}

export type GlobalState = {
  userState: UserState,
  organizations: Organization[]
}

export type ActionsMap = {
  setUserState: Partial<UserState>,
  setOrgState: Organization[]
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

    case "setOrgState":
      return {
        ...state, organizations: action.payload
      }

    default:
      return state
  }
}