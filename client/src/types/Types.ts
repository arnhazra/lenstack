import { ReactNode } from "react"

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
    selectedPlan: string,
    apiKey: string,
    tokenId: string,
    subscriptionValidUpto: string
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

export type ProductCardProps = {
    productName: string,
    description: string,
    url: string,
    productAvailable: boolean,
    dbRegion: string
}

export type DocDetails = {
    title: string,
    content: string,
    apiKey: string
}

export type ProjectCardProps = {
    id: string
    name: string,
}