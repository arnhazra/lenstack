import { ReactNode } from 'react'

export type LayoutProps = {
    children: ReactNode
}

export type ShowProps = {
    when: boolean,
    children: ReactNode
}

export type ErrorProps = {
    customMessage?: string
}

export type UserState = {
    userid: string,
    name: string,
    privateKey: string,
    email: string,
    role: string,
    subscriptionKey: string
    subscriptionKeyUsage: number
}

export type SubPlanState = {
    basicSubscriptionPrice: string,
    standardSubscriptionPrice: string,
    premiumSubscriptionPrice: string,
}

export type SubReqLimitState = {
    basicSubscriptionReqLimit: string,
    standardSubscriptionReqLimit: string,
    premiumSubscriptionReqLimit: string
}

export type DatasetCardProps = {
    id: string
    category: string,
    name: string,
    rating: number
}

export type DatasetRequestState = {
    searchQuery: string,
    selectedFilter: string,
    selectedSortOption: string
    offset: number
}