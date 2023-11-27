import { ReactNode } from "react"

export interface ShowProps {
  when: boolean
  children: ReactNode
}

export interface ErrorProps {
  customMessage?: string
}

export interface UserState {
  userId: string
  privateKey: string
  email: string
  role: string
  selectedPlan: string
  clientId: string
  clientSecret: string
  expiresAt: string
  trialAvailable: boolean
  selectedWorkspaceId: string
  selectedWorkspaceName: string
  remainingCredits: number | string
  refreshId: string,
  hasActiveSubscription: boolean
}

export interface DatasetRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export interface ProductCardInterface {
  headerText: string
  footerText: string
  badgeText: string
  redirectUri: string
  className: string
  isDisabled?: boolean
}

export interface ProductCardProps {
  productCardProps: ProductCardInterface
}

export interface TokenData {
  tokenName: string
  tokenSymbol: string
  tokenContractAddress: string
  vendorContractAddress: string
  tokensPerMatic: number
  description: string
}

export interface GlobalStateProviderProps {
  children: ReactNode
}