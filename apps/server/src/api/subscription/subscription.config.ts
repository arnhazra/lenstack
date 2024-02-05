export enum SubscriptionPlans {
  Hobby = "hobby",
  Starter = "starter",
  Premium = "premium",
  Ultra = "ultra",
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.Hobby,
    price: 0,
    grantedCredits: 5000
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 1.09,
    grantedCredits: 25000
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 1.99,
    grantedCredits: 50000
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 3.49,
    grantedCredits: 100000
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