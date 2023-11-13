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
  apiKey: string
  expiresAt: string
  trialAvailable: boolean,
  selectedWorkspaceId: string,
  selectedWorkspaceName: string,
  remainingCredits: number | string,
  refreshId: string
}

export interface DatasetRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export interface GenericProductCardInterface {
  headerText: string
  footerText: string
  badgeText: string
  redirectUri: string
  className: string
}

export interface GenericProductCardProps {
  genericProductCardProps: GenericProductCardInterface
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