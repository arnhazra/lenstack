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
    grantedCredits: 10000,
    features: ["Valid for a month", "Regular API response", "Good for a start"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 1.49,
    grantedCredits: 50000,
    features: ["Valid for a month", "Priority API response", "Good for developers"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 2.99,
    grantedCredits: 150000,
    features: ["Valid for a month", "Faster API response", "Good for startups"],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 5.49,
    grantedCredits: 500000,
    features: ["Valid for a month", "Fastest API response", "The enterprise plan"],
    isMostEfficient: false
  },
]

export const apiPricing: Record<string, number> = {
  analytics: 2,
  copilot: 5,
  dataexchange: 2,
  kvstore: 2,
  wallet: 5,
  ledgerscan: 2,
  nftstudio: 50,
  swap: 5
}