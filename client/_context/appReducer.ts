import { UserState } from "@/_types/Types"

export type AppState = {
  userState: UserState
}

export type ActionsMap = {
  setUserState: { [key: string]: string | boolean }
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

    default:
      return state
  }
}