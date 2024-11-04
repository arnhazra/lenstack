export type Product = {
  _id: string
  productName: string
  displayName: string
  description: string
  productStatus: string
  productCategory: string
  productIcon: string
}

export type Solution = {
  _id: string
  solutionName: string
  description: string
  solutionIcon: string
}

export type User = {
  _id: string
  email: string
  name: string
  role: string
  hasTrial: boolean
  reduceCarbonEmissions: boolean
  activityLog: boolean
  createdAt: string
  selectedOrgId: string
}

export type Subscription = {
  _id: string
  subscriptionTier: string
  xp: number
  price: number
  platformDelay: number
  features: string[]
  createdAt: string
  endsAt: string
}

export type Organization = {
  _id: string
  name: string
  userId: string
  accessToken: string
  createdAt: string
}
