export enum SubscriptionPlans {
  Hobby = "hobby",
  Starter = "starter",
  Premium = "premium",
  Ultra = "ultra",
}

interface ValueItem {
  key: string,
  value: string
}

export interface CreditType {
  planName: SubscriptionPlans
  price: number,
  grantedCredits: number,
  features: ValueItem[],
  isMostEfficient: boolean
}

export const subscriptionConfig: CreditType[] = [
  {
    planName: SubscriptionPlans.Hobby,
    price: 0,
    grantedCredits: 5000,
    features: [
      {
        key: "Validity",
        value: "Valid for a month"
      },
      {
        key: "API Response Latency",
        value: "Regular API response"
      },
      {
        key: "Target Audience",
        value: "Good for a start"
      }],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Starter,
    price: 1.99,
    grantedCredits: 50000,
    features: [
      {
        key: "Validity",
        value: "Valid for a month"
      },
      {
        key: "API Response Latency",
        value: "Priority API response"
      },
      {
        key: "Target Audience",
        value: "Good for developers"
      }],
    isMostEfficient: false
  },
  {
    planName: SubscriptionPlans.Premium,
    price: 3.99,
    grantedCredits: 150000,
    features: [
      {
        key: "Validity",
        value: "Valid for a month"
      },
      {
        key: "API Response Latency",
        value: "Faster API response"
      },
      {
        key: "Target Audience",
        value: "Good for startups"
      }],
    isMostEfficient: true
  },
  {
    planName: SubscriptionPlans.Ultra,
    price: 7.99,
    grantedCredits: 500000,
    features: [
      {
        key: "Validity",
        value: "Valid for a month"
      },
      {
        key: "API Response Latency",
        value: "Fastest API response"
      },
      {
        key: "Target Audience",
        value: "Good for enterprises"
      }],
    isMostEfficient: false
  },
]

export const apiPricing: Record<string, number> = {
  analytics: 2,
  copilot: 5,
  dataexchange: 2,
  kvstore: 2,
  wallet: 5,
  ledgerscan: 2,
  nftstudio: 50,
  swap: 5
}