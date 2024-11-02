export enum SubscriptionTier {
  Trial = "trial",
  Standard = "standard",
  Premium = "premium",
}

export interface SubscriptionConfig {
  subscriptionTier: SubscriptionTier
  xp: number
  price: number
  platformDelay: number
  features: string[]
}

export const subscriptionPricing: SubscriptionConfig[] = [
  {
    subscriptionTier: SubscriptionTier.Trial,
    xp: 300,
    price: 0,
    platformDelay: 100,
    features: [
      "One month free trial",
      "Basic API response delay",
      "Good for exploration",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Standard,
    xp: 300,
    price: 29,
    platformDelay: 50,
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
    features: [
      "Valid for a month",
      "Priority API response",
      "Good for creators",
    ],
  },
]
