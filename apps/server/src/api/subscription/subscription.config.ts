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
    features: ["Valid for a month", "Try all features", "Regular API response", "Completely free", "Good for individuals"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 1.09,
    grantedCredits: 25000,
    features: ["Valid for a month", "Exclusive access", "Priority API response", "Discontinue anytime", "Good for developers"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 1.99,
    grantedCredits: 50000,
    features: ["Valid for a month", "Exclusive access", "Faster API response", "Discontinue anytime", "Good for startups"],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 3.49,
    grantedCredits: 100000,
    features: ["Valid for a month", "Exclusive access", "Fastest API response", "Discontinue anytime", "The best plan"],
    isMostEfficient: false
  },
]

export const apiPricing: Record<string, number> = {
  copilot: 5,
  datalake: 3,
  fabric: 2,
  insights: 3,
  wallet: 5,
  ledgerscan: 2,
  nftstudio: 50,
  swap: 10
}