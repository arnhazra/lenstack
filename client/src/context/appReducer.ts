import { UserState, SubPlanState, SubReqLimitState, DatasetRequestState } from '../types/Types'

export type AppState = {
    userState: UserState
    subPlanState: SubPlanState,
    datasetRequestState: DatasetRequestState,
    subReqLimitState: SubReqLimitState
}

export type ActionsMap = {
    setUserState: { [key: string]: string | boolean }
    setSubPlanState: { [key: string]: string },
    setDatasetRequestState: { [key: string]: string | number },
    setSubReqLimitState: { [key: string]: string }
}

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key
        payload: ActionsMap[Key]
    }
}[keyof ActionsMap]

export const AppReducer = (state: AppState, action: Actions): AppState => {
    switch (action.type) {
        case 'setUserState':
            return {
                ...state, userState: { ...state.userState, ...action.payload }
            }

        case 'setSubPlanState':
            return {
                ...state, subPlanState: { ...state.subPlanState, ...action.payload }
            }

        case 'setDatasetRequestState':
            return {
                ...state, datasetRequestState: { ...state.datasetRequestState, ...action.payload }
            }

        case 'setSubReqLimitState':
            return {
                ...state, subReqLimitState: { ...state.subReqLimitState, ...action.payload }
            }

        default:
            return state
    }
}