export enum SubscriptionPlans {
  AS0 = "as0",
  AS1 = "as1",
  AS2 = "as2",
  MS1 = "ms1",
  MS2 = "ms2",
  PS1 = "ps1",
  PS2 = "ps2",
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number,
  responseDelay: number,
  features: string[],
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.AS0,
    price: 0,
    grantedCredits: 5000,
    responseDelay: 1500,
    features: [
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
  },
  {
    planName: SubscriptionPlans.AS1,
    price: 9,
    grantedCredits: 15000,
    responseDelay: 1000,
    features: [
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
  },
  {
    planName: SubscriptionPlans.AS2,
    price: 19,
    grantedCredits: 40000,
    responseDelay: 900,
    features: [
      "Renewed monthly",
      "Regular API response",
      "Good for developers",
    ],
  },
  {
    planName: SubscriptionPlans.MS1,
    price: 39,
    grantedCredits: 100000,
    responseDelay: 500,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
  },
  {
    planName: SubscriptionPlans.MS2,
    price: 59,
    grantedCredits: 200000,
    responseDelay: 300,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
  },
  {
    planName: SubscriptionPlans.PS1,
    price: 79,
    grantedCredits: 400000,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Faster API response",
      "Good for organizations",
    ],
  },
  {
    planName: SubscriptionPlans.PS2,
    price: 99,
    grantedCredits: 800000,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Fastest API response",
      "Good for organizations",
    ],
  },
]