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
    grantedCredits: 50000,
    features: ["Valid for a year", "Try all features", "Regular API response", "Completely free", "Good for individuals"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 11.99,
    grantedCredits: 300000,
    features: ["Valid for a year", "Exclusive access", "Priority API response", "Discontinue anytime", "Good for developers"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 21.99,
    grantedCredits: 600000,
    features: ["Valid for a year", "Exclusive access", "Faster API response", "Discontinue anytime", "Good for startups"],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 41.99,
    grantedCredits: 1500000,
    features: ["Valid for a year", "Exclusive access", "Fastest API response", "Discontinue anytime", "The best plan"],
    isMostEfficient: false
  },
]

export const apiPricing: Record<string, number> = {
  copilot: 5,
  datalake: 2,
  fabric: 2,
  insights: 2,
  wallet: 5,
  ledgerscan: 2,
  nftstudio: 50,
  swap: 5
}