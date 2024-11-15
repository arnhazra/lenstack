import { Workspace, Subscription, User } from "@/shared/types"

export type GlobalState = {
  user: User
  subscription: Subscription | null
  selectedWorkspace: Workspace
  workspaces: Workspace[]
  refreshId: string
}

export type ActionsMap = {
  setUser: Partial<User>
  setSubscription: Subscription | null
  setSelectedWorkspace: Workspace
  setWorkspaces: Workspace[]
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

    case "setSubscription":
      return {
        ...state,
        subscription: action.payload,
      }

    case "setSelectedWorkspace":
      return {
        ...state,
        selectedWorkspace: action.payload,
      }

    case "setWorkspaces":
      return {
        ...state,
        workspaces: action.payload,
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
