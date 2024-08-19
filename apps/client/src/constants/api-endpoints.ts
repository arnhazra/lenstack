import { uiConstants } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://${uiConstants.brandName}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${uiConstants.brandName}.vercel.app`

export const endPoints = {
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  updateAttribute: `${apiHost}/api/user/attribute`,
  getPricingConfig: `${apiHost}/api/pricing/config`,
  createCheckoutSession: `${apiHost}/api/pricing/checkout`,
  getProductConfig: `${apiHost}/api/products/config`,
  getSolutionConfig: `${apiHost}/api/solutions/config`,
  getapireference: `${apiHost}/api/apireference`,
  organization: `${apiHost}/api/organization`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  datamarketplaceFilters: `${apiHost}/api/products/datamarketplace/filters`,
  datamarketplaceFindDatasets: `${apiHost}/api/products/datamarketplace/finddatasets`,
  datamarketplaceViewDataset: `${apiHost}/api/products/datamarketplace/viewdataset`,
  datamarketplaceDataApi: `${apiHost}/api/products/datamarketplace/dataapi`,
  httpnosqlCreateData: `${apiHost}/api/products/httpnosql/create`,
  httpnosqlReadData: `${apiHost}/api/products/httpnosql/read`,
  httpnosqlUpdateData: `${apiHost}/api/products/httpnosql/update`,
  httpnosqlDeleteData: `${apiHost}/api/products/httpnosql/delete`,
  identityGetAllUsers: `${apiHost}/api/products/identity/getallusers`,
  webanalyticsView: `${apiHost}/api/products/webanalytics/get`,
  webanalyticsCreate: `${apiHost}/api/products/webanalytics/create`,
}