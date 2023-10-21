import { ReactNode } from "react"

export interface LayoutProps {
  children: ReactNode
}

export interface ShowProps {
  when: boolean
  children: ReactNode
}

export interface ErrorProps {
  customMessage?: string
}

export interface UserState {
  userid: string
  name: string
  privateKey: string
  email: string
  role: string
  selectedPlan: string
  apiKey: string
  subscriptionValidUpto: string
  trialAvailable: boolean
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

export interface CruxQlDb {
  _id: string
  region: string
  cloudPlatform: string
  isSold: boolean
  connectionString?: string
}

export interface AppStateProviderProps {
  children: ReactNode
}