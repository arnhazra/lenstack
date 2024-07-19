export enum SubscriptionPlans {
  AS0 = "as0",
  AS1 = "as1",
  AS2 = "as2",
  AS3 = "as3",
  MS1 = "ms1",
  MS2 = "ms2",
  MS3 = "ms3",
  PS1 = "ps1",
  PS2 = "ps2",
  PS3 = "ps3",
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
      "Upto 2 workspaces",
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
  },
  {
    planName: SubscriptionPlans.AS1,
    price: 99,
    grantedCredits: 15000,
    responseDelay: 1000,
    features: [
      "Upto 3 workspaces",
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
  },
  {
    planName: SubscriptionPlans.AS2,
    price: 199,
    grantedCredits: 40000,
    responseDelay: 750,
    features: [
      "Upto 3 workspaces",
      "Renewed monthly",
      "Regular API response",
      "Good for developers",
    ],
  },
  {
    planName: SubscriptionPlans.AS3,
    price: 299,
    grantedCredits: 70000,
    responseDelay: 700,
    features: [
      "Upto 4 workspaces",
      "Renewed monthly",
      "Regular API response",
      "Good for developers",
    ],
  },
  {
    planName: SubscriptionPlans.MS1,
    price: 599,
    grantedCredits: 150000,
    responseDelay: 500,
    features: [
      "Upto 5 workspaces",
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
  },
  {
    planName: SubscriptionPlans.MS2,
    price: 799,
    grantedCredits: 200000,
    responseDelay: 400,
    features: [
      "Upto 5 workspaces",
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
  },
  {
    planName: SubscriptionPlans.MS3,
    price: 999,
    grantedCredits: 300000,
    responseDelay: 300,
    features: [
      "Upto 5 workspaces",
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
  },
  {
    planName: SubscriptionPlans.PS1,
    price: 1999,
    grantedCredits: 650000,
    responseDelay: 100,
    features: [
      "Upto 10 workspaces",
      "Renewed monthly",
      "Faster API response",
      "Good for organizations",
    ],
  },
  {
    planName: SubscriptionPlans.PS2,
    price: 3999,
    grantedCredits: 1500000,
    responseDelay: 0,
    features: [
      "Upto 15 workspaces",
      "Renewed monthly",
      "Fastest API response",
      "Good for organizations",
    ],
  },
  {
    planName: SubscriptionPlans.PS3,
    price: 5499,
    grantedCredits: 3000000,
    responseDelay: 0,
    features: [
      "Upto 20 workspaces",
      "Renewed monthly",
      "Fastest API response",
      "Good for organizations",
    ],
  }
]