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
    features: ["Valid for a month", "Regular API response", "Good for individuals"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 1.09,
    grantedCredits: 25000,
    features: ["Valid for a month", "Priority API response", "Good for developers"],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 1.99,
    grantedCredits: 50000,
    features: ["Valid for a month", "Faster API response", "Good for startups"],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 3.49,
    grantedCredits: 100000,
    features: ["Valid for a month", "Fastest API response", "The best plan"],
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