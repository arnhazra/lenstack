export enum SubscriptionTier {
  Trial = "trial",
  Basic = "basic",
  Standard = "standard",
  Premium = "premium",
}

export interface SubscriptionConfig {
  subscriptionTier: SubscriptionTier
  xp: number
  price: number
  platformDelay: number
  requestCost: number
  features: string[]
}

export const subscriptionPricing: SubscriptionConfig[] = [
  {
    subscriptionTier: SubscriptionTier.Trial,
    xp: 200,
    price: 0,
    platformDelay: 1000,
    requestCost: 0.01,
    features: [
      "One month free trial",
      "Basic API response delay",
      "Good for exploration",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Basic,
    xp: 200,
    price: 19,
    platformDelay: 500,
    requestCost: 0.015,
    features: [
      "One month free trial",
      "Basic API response delay",
      "Good for exploration",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Standard,
    xp: 400,
    price: 29,
    platformDelay: 200,
    requestCost: 0.025,
    features: [
      "Valid for a month",
      "Standard API response",
      "Good for developers",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Premium,
    xp: 800,
    price: 49,
    platformDelay: 0,
    requestCost: 0.03,
    features: [
      "Valid for a month",
      "Priority API response",
      "Good for creators",
    ],
  },
]
