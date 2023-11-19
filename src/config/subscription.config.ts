interface CreditType {
  price: number,
  grantedCredits: number
}

export interface SubscriptionConfigType {
  trial: CreditType,
  pro: CreditType
}

interface APIPricingType {
  [key: string]: number
}

export const subscriptionConfig: SubscriptionConfigType = {
  trial: {
    price: 0,
    grantedCredits: 10000
  },
  pro: {
    price: 1.99,
    grantedCredits: 50000
  }
}

export const apiPricing: APIPricingType = {
  datalake: 3,
  pay: 5,
  insights: 3,
  nftstudio: 50,
  swap: 10,
  fabric: 2,
  ledgerscan: 2
}