export enum ComputeTier {
  Standard = "standard",
  Premium = "premium",
  Hyperscale = "hyperscale",
  Quantum = "quantum",
  Infinity = "infinity"
}

export enum Products {
  Copilot = "copilot",
  DataMarketplace = "datamarketplace",
  HttpNosql = "httpnosql",
  Identity = "identity",
  WebAnalytics = "webanalytics"
}

export interface PricingConfig {
  computeTier: ComputeTier,
  responseDelay: number,
  estimatedRequestCost: {
    [key in Products]: number
  }
}

export const pricingConfig: PricingConfig[] = [
  {
    computeTier: ComputeTier.Standard,
    responseDelay: 1200,
    estimatedRequestCost: {
      copilot: 0.02,
      datamarketplace: 0.01,
      httpnosql: 0.02,
      identity: 0.02,
      webanalytics: 0.01
    }
  },
  {
    computeTier: ComputeTier.Premium,
    responseDelay: 900,
    estimatedRequestCost: {
      copilot: 0.03,
      datamarketplace: 0.02,
      httpnosql: 0.03,
      identity: 0.03,
      webanalytics: 0.02
    }
  },
  {
    computeTier: ComputeTier.Hyperscale,
    responseDelay: 600,
    estimatedRequestCost: {
      copilot: 0.05,
      datamarketplace: 0.03,
      httpnosql: 0.05,
      identity: 0.05,
      webanalytics: 0.03
    }
  },
  {
    computeTier: ComputeTier.Quantum,
    responseDelay: 300,
    estimatedRequestCost: {
      copilot: 0.08,
      datamarketplace: 0.04,
      httpnosql: 0.07,
      identity: 0.07,
      webanalytics: 0.05
    }
  },
  {
    computeTier: ComputeTier.Infinity,
    responseDelay: 0,
    estimatedRequestCost: {
      copilot: 0.12,
      datamarketplace: 0.06,
      httpnosql: 0.09,
      identity: 0.09,
      webanalytics: 0.08
    }
  },
]