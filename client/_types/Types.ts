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
  selectedWorkspaceId: string
}

export interface DatasetRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export interface GenericAppCardInterface {
  headerText: string
  footerText: string
  badgeText: string
  redirectUri: string
  className: string
}

export interface GenericAppCardProps {
  genericAppCardProps: GenericAppCardInterface
}

export interface TokenData {
  tokenName: string
  tokenSymbol: string
  tokenContractAddress: string
  vendorContractAddress: string
  tokensPerMatic: number
  description: string
}

export interface AppStateProviderProps {
  children: ReactNode
}