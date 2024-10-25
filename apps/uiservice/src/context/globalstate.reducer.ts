import { Organization, User } from "@/types/Types"

export type GlobalState = {
  user: User
  selectedOrg: Organization
  organizations: Organization[]
  refreshId: string
}

export type ActionsMap = {
  setUser: Partial<User>
  setSelectedOrg: Organization
  setOrgs: Organization[]
  setRefreshId: string
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key
    payload: ActionsMap[Key]
  }
}[keyof ActionsMap]

export const GlobalReducer = (
  state: GlobalState,
  action: Actions
): GlobalState => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }

    case "setSelectedOrg":
      return {
        ...state,
        selectedOrg: action.payload,
      }

    case "setOrgs":
      return {
        ...state,
        organizations: action.payload,
      }

    case "setRefreshId":
      return {
        ...state,
        refreshId: action.payload,
      }

    default:
      return state
  }
}
