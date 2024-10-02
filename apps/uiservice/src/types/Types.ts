export type Product = {
  _id: string,
  productName: string,
  displayName: string,
  description: string,
  productStatus: string,
  productCategory: string,
  productIcon: string
}

export type Solution = {
  _id: string,
  solutionName: string,
  description: string,
  solutionIcon: string
}

export type Pricing = {
  computeTier: string,
  responseDelay: number,
  estimatedRequestCost: {
    intelligence: number,
    datamarketplace: number,
    httpnosql: number,
    webanalytics: number
  }
}

export type Organization = {
  _id: string,
  name: string,
  userId: string,
  clientId: string,
  clientSecret: string,
  createdAt: string
}