export enum SubscriptionPlans {
  AS0 = "as0",
  AS1 = "as1",
  AS2 = "as2",
  MS1 = "ms1",
  MS2 = "ms2",
  PS1 = "ps1",
  PS2 = "ps2",
}

export enum Products {
  Analytics = "analytics",
  Blockchain = "blockchain",
  Copilot = "copilot",
  DataMarketplace = "datamarketplace",
  HttpNosql = "httpnosql",
  Insights = "insights"
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number,
  responseDelay: number,
  features: string[],
  estimatedRequestCost: {
    [key in Products]: number
  }
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.AS0,
    price: 0,
    grantedCredits: 5,
    responseDelay: 1500,
    features: [
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
    estimatedRequestCost: {
      analytics: 0.002,
      blockchain: 0.001,
      copilot: 0.015,
      datamarketplace: 0.002,
      httpnosql: 0.004,
      insights: 0.003
    }
  },
  {
    planName: SubscriptionPlans.AS1,
    price: 20,
    grantedCredits: 20,
    responseDelay: 1000,
    features: [
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
    estimatedRequestCost: {
      analytics: 0.003,
      blockchain: 0.002,
      copilot: 0.025,
      datamarketplace: 0.003,
      httpnosql: 0.005,
      insights: 0.004
    }
  },
  {
    planName: SubscriptionPlans.AS2,
    price: 40,
    grantedCredits: 40,
    responseDelay: 1000,
    features: [
      "Renewed monthly",
      "Regular API response",
      "Good for developers",
    ],
    estimatedRequestCost: {
      analytics: 0.003,
      blockchain: 0.002,
      copilot: 0.025,
      datamarketplace: 0.003,
      httpnosql: 0.005,
      insights: 0.004
    }
  },
  {
    planName: SubscriptionPlans.MS1,
    price: 50,
    grantedCredits: 50,
    responseDelay: 500,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
    estimatedRequestCost: {
      analytics: 0.005,
      blockchain: 0.004,
      copilot: 0.035,
      datamarketplace: 0.005,
      httpnosql: 0.007,
      insights: 0.006
    }
  },
  {
    planName: SubscriptionPlans.MS2,
    price: 70,
    grantedCredits: 70,
    responseDelay: 500,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
    estimatedRequestCost: {
      analytics: 0.005,
      blockchain: 0.004,
      copilot: 0.035,
      datamarketplace: 0.005,
      httpnosql: 0.007,
      insights: 0.006
    }
  },
  {
    planName: SubscriptionPlans.PS1,
    price: 100,
    grantedCredits: 100,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Faster API response",
      "Good for organizations",
    ],
    estimatedRequestCost: {
      analytics: 0.008,
      blockchain: 0.007,
      copilot: 0.045,
      datamarketplace: 0.008,
      httpnosql: 0.009,
      insights: 0.008
    }
  },
  {
    planName: SubscriptionPlans.PS2,
    price: 120,
    grantedCredits: 120,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Fastest API response",
      "Good for organizations",
    ],
    estimatedRequestCost: {
      analytics: 0.008,
      blockchain: 0.007,
      copilot: 0.045,
      datamarketplace: 0.008,
      httpnosql: 0.009,
      insights: 0.008
    }
  },
]