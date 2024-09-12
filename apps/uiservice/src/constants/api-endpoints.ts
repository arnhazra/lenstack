import { brandName } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://api-${brandName.toLowerCase()}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${brandName.toLowerCase()}.vercel.app`

export const endPoints = {
  generatePassKey: `${apiHost}/user/generatepasskey`,
  verifyPassKey: `${apiHost}/user/verifypasskey`,
  userDetails: `${apiHost}/user/userdetails`,
  signOut: `${apiHost}/user/signout`,
  updateAttribute: `${apiHost}/user/attribute`,
  getPricingConfig: `${apiHost}/pricing/config`,
  createCheckoutSession: `${apiHost}/pricing/checkout`,
  getProductConfig: `${apiHost}/products/config`,
  getSolutionConfig: `${apiHost}/solutions/config`,
  getapireference: `${apiHost}/apireference`,
  organization: `${apiHost}/organization`,
  intelligenceGenerateEndpoint: `${apiHost}/products/intelligence/generate`,
  datamarketplaceFilters: `${apiHost}/products/datamarketplace/filters`,
  datamarketplaceFindDatasets: `${apiHost}/products/datamarketplace/finddatasets`,
  datamarketplaceViewDataset: `${apiHost}/products/datamarketplace/viewdataset`,
  datamarketplaceDataApi: `${apiHost}/products/datamarketplace/dataapi`,
  httpnosqlCreateData: `${apiHost}/products/httpnosql/create`,
  httpnosqlReadData: `${apiHost}/products/httpnosql/read`,
  httpnosqlUpdateData: `${apiHost}/products/httpnosql/update`,
  httpnosqlDeleteData: `${apiHost}/products/httpnosql/delete`,
  identityGetAllUsers: `${apiHost}/products/identity/getallusers`,
  webanalyticsView: `${apiHost}/products/webanalytics/get`,
  webanalyticsCreate: `${apiHost}/products/webanalytics/create`,
}