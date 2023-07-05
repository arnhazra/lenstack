import { FC, ReactNode, createContext, useCallback, useMemo, useReducer } from 'react'
import { AppState, Actions, ActionsMap, AppReducer } from './appReducer'

export type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type,
    ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type AppContextInterface = readonly [AppState, Dispatcher]

const initialState = {
    userState: {
        userid: '',
        name: '',
        privateKey: '',
        email: '',
        role: '',
        selectedPlan: 'No Subscription',
        apiKey: '',
        tokenId: '',
        subscriptionValidUpto: ''
    },

    datasetRequestState: {
        searchQuery: '',
        selectedFilter: 'All',
        selectedSortOption: 'name',
        offset: 0
    }
}

export const AppContext = createContext<AppContextInterface>([initialState, ((): void => undefined)])

interface AppStateProviderProps {
    children: ReactNode
}

const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
    const [state, _dispatch] = useReducer(AppReducer, initialState)
    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as Actions)
    }, [])
    const values = useMemo(() => [state, dispatch] as AppContextInterface, [state])
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppStateProvider