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
  HttpNosql = "httpnosql"
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
      analytics: 0.0015,
      blockchain: 0.0007,
      copilot: 0.0090,
      datamarketplace: 0.0007,
      httpnosql: 0.0040
    }
  },
  {
    planName: SubscriptionPlans.AS1,
    price: 10,
    grantedCredits: 15,
    responseDelay: 1000,
    features: [
      "Renewed monthly",
      "Slower API response",
      "Good for starters",
    ],
    estimatedRequestCost: {
      analytics: 0.0020,
      blockchain: 0.0010,
      copilot: 0.0100,
      datamarketplace: 0.0010,
      httpnosql: 0.0050
    }
  },
  {
    planName: SubscriptionPlans.AS2,
    price: 20,
    grantedCredits: 25,
    responseDelay: 1000,
    features: [
      "Renewed monthly",
      "Regular API response",
      "Good for developers",
    ],
    estimatedRequestCost: {
      analytics: 0.0020,
      blockchain: 0.0010,
      copilot: 0.0100,
      datamarketplace: 0.0010,
      httpnosql: 0.0050
    }
  },
  {
    planName: SubscriptionPlans.MS1,
    price: 40,
    grantedCredits: 50,
    responseDelay: 500,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
    estimatedRequestCost: {
      analytics: 0.0034,
      blockchain: 0.0017,
      copilot: 0.0170,
      datamarketplace: 0.001,
      httpnosql: 0.005
    }
  },
  {
    planName: SubscriptionPlans.MS2,
    price: 60,
    grantedCredits: 70,
    responseDelay: 500,
    features: [
      "Renewed monthly",
      "Priority API response",
      "Good for startups",
    ],
    estimatedRequestCost: {
      analytics: 0.0034,
      blockchain: 0.0017,
      copilot: 0.0170,
      datamarketplace: 0.001,
      httpnosql: 0.005
    }
  },
  {
    planName: SubscriptionPlans.PS1,
    price: 80,
    grantedCredits: 100,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Faster API response",
      "Good for organizations",
    ],
    estimatedRequestCost: {
      analytics: 0.0044,
      blockchain: 0.0022,
      copilot: 0.0220,
      datamarketplace: 0.0022,
      httpnosql: 0.0110
    }
  },
  {
    planName: SubscriptionPlans.PS2,
    price: 100,
    grantedCredits: 120,
    responseDelay: 0,
    features: [
      "Renewed monthly",
      "Fastest API response",
      "Good for organizations",
    ],
    estimatedRequestCost: {
      analytics: 0.0044,
      blockchain: 0.0022,
      copilot: 0.0220,
      datamarketplace: 0.0022,
      httpnosql: 0.0110
    }
  },
]