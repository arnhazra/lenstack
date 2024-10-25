export enum ComputeTier {
  Fabric = "fabric",
  Hyperscale = "hyperscale",
  Quantum = "quantum",
  Skylake = "skylake",
}

export enum Products {
  Intelligence = "intelligence",
  DataMarketplace = "datamarketplace",
  HttpNosql = "httpnosql",
  WebAnalytics = "webanalytics",
}

export interface PricingConfig {
  computeTier: ComputeTier
  responseDelay: number
  estimatedRequestCost: {
    [key in Products]: number
  }
}

export const pricingConfig: PricingConfig[] = [
  {
    computeTier: ComputeTier.Fabric,
    responseDelay: 1200,
    estimatedRequestCost: {
      intelligence: 0.02,
      datamarketplace: 0.01,
      httpnosql: 0.02,
      webanalytics: 0.01,
    },
  },
  {
    computeTier: ComputeTier.Hyperscale,
    responseDelay: 800,
    estimatedRequestCost: {
      intelligence: 0.03,
      datamarketplace: 0.02,
      httpnosql: 0.03,
      webanalytics: 0.02,
    },
  },
  {
    computeTier: ComputeTier.Quantum,
    responseDelay: 400,
    estimatedRequestCost: {
      intelligence: 0.05,
      datamarketplace: 0.03,
      httpnosql: 0.05,
      webanalytics: 0.03,
    },
  },
  {
    computeTier: ComputeTier.Skylake,
    responseDelay: 0,
    estimatedRequestCost: {
      intelligence: 0.12,
      datamarketplace: 0.06,
      httpnosql: 0.09,
      webanalytics: 0.08,
    },
  },
]
