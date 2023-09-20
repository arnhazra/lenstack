import { UserState, DatasetRequestState } from "@/_types/Types"

export type AppState = {
    userState: UserState
    datasetRequestState: DatasetRequestState,
}

export type ActionsMap = {
    setUserState: { [key: string]: string | boolean }
    setDatasetRequestState: { [key: string]: string | number },
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

        case "setDatasetRequestState":
            return {
                ...state, datasetRequestState: { ...state.datasetRequestState, ...action.payload }
            }

        default:
            return state
    }
}