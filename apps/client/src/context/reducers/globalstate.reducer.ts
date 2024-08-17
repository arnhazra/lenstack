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
  activityLog: boolean,
  refreshId: string,
  searchQuery: string
}

export interface ProductState {
  _id: string,
  productName: string,
  displayName: string,
  description: string,
  productStatus: string,
  productCategory: string,
  productIcon: string
}

export type GlobalState = {
  userState: UserState,
  productState: ProductState
}

export type ActionsMap = {
  setUserState: Partial<UserState>,
  setProductState: Partial<ProductState>
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

    case "setProductState":
      return {
        ...state, productState: { ...state.productState, ...action.payload }
      }

    default:
      return state
  }
}