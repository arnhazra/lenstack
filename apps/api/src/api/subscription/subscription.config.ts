export enum SubscriptionPlans {
  Pro = "pro",
  Trial = "trial",
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number,
  features: string[],
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.Pro,
    price: 99,
    grantedCredits: 100000,
    features: [
      "Upto 10 workspaces",
      "Renewed monthly",
      "Priority API response",
      "Good for organizations",
      "The pro plan"
    ],
  },
  {
    planName: SubscriptionPlans.Trial,
    price: 0,
    grantedCredits: 10000,
    features: [
      "Upto 10 workspaces",
      "Valid for a month",
      "Regular API response",
      "Good for developers",
      "The trial plan",
    ],
  },
]