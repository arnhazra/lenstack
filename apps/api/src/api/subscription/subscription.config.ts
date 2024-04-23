export enum SubscriptionPlans {
  Hobby = "hobby",
  Starter = "starter",
  Premium = "premium",
  Ultra = "ultra",
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number,
  features: string[],
  isMostEfficient: boolean
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.Hobby,
    price: 0,
    grantedCredits: 5000,
    features: [
      "Upto 10 workspaces",
      "Valid for a month",
      "Regular API response",
      "Good for a start",
      "Free forever plan"
    ],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 149,
    grantedCredits: 50000,
    features: [
      "Upto 10 workspaces",
      "Valid for a month",
      "Priority API response",
      "Good for developers",
      "The value plan"
    ],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 299,
    grantedCredits: 150000,
    features: [
      "Upto 10 workspaces",
      "Valid for a month",
      "Faster API response",
      "Good for startups",
      "The efficient plan"
    ],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 499,
    grantedCredits: 500000,
    features: [
      "Upto 10 workspaces",
      "Valid for a month",
      "Fastest API response",
      "Good for enterprises",
      "The ultra plan"
    ],
    isMostEfficient: false
  },
]

export const apiPricing: Record<string, number> = {
  analytics: 2,
  copilot: 5,
  dataexchange: 2,
  kvstore: 2,
  wallet: 1,
  nftstudio: 5,
  swap: 1
}