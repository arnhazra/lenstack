import { UserState } from "@/types/Types"

export type AppState = {
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

export const AppReducer = (state: AppState, action: Actions): AppState => {
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