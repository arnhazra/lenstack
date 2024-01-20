export enum SubscriptionPlans {
  Trial = "trial",
  Basic = "basic",
  Standard = "standard",
  Premium = "premium"
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.Trial,
    price: 0,
    grantedCredits: 10000
  },
  {
    planName: SubscriptionPlans.Basic,
    price: 1.09,
    grantedCredits: 25000
  },
  {
    planName: SubscriptionPlans.Standard,
    price: 1.99,
    grantedCredits: 50000
  },
  {
    planName: SubscriptionPlans.Premium,
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