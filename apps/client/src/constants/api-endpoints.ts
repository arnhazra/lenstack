import { uiConstants } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://${uiConstants.brandName}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${uiConstants.brandName}.vercel.app`

export const endPoints = {
  getapireference: `${apiHost}/api/apireference/get`,
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  updateCarbonSettings: `${apiHost}/api/user/updatecarbonsettings`,
  getSubscriptionConfig: `${apiHost}/api/subscription/config`,
  createCheckoutSession: `${apiHost}/api/subscription/create-checkout-session`,
  createOrganization: `${apiHost}/api/organization/create`,
  findMyOrganizations: `${apiHost}/api/organization/findmyorganizations`,
  switchOrganization: `${apiHost}/api/organization/switch`,
  deleteOrganization: `${apiHost}/api/organization/delete`,
  getProductConfig: `${apiHost}/api/products/config`,
  getSolutionConfig: `${apiHost}/api/solutions/config`,
  analyticsView: `${apiHost}/api/products/analytics/get`,
  analyticsCreate: `${apiHost}/api/products/analytics/create`,
  blockchainGatewayFilters: `${apiHost}/api/products/blockchain/gatewayfilters`,
  blockchainNetworkFilters: `${apiHost}/api/products/blockchain/networkfilters`,
  blockchainFindNetworks: `${apiHost}/api/products/blockchain/findnetworks`,
  blockchainViewNetwork: `${apiHost}/api/products/blockchain/viewnetwork`,
  blockchainGateway: `${apiHost}/api/products/blockchain/gateway`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  datamarketplaceFilters: `${apiHost}/api/products/datamarketplace/filters`,
  datamarketplaceFindDatasets: `${apiHost}/api/products/datamarketplace/finddatasets`,
  datamarketplaceViewDatasets: `${apiHost}/api/products/datamarketplace/viewdataset`,
  datamarketplaceFindSimilarDatasets: `${apiHost}/api/products/datamarketplace/findsimilardatasets`,
  datamarketplaceDataApi: `${apiHost}/api/products/datamarketplace/dataapi`,
  httpnosqlCreateData: `${apiHost}/api/products/httpnosql/create`,
  httpnosqlReadData: `${apiHost}/api/products/httpnosql/read`,
  httpnosqlUpdateData: `${apiHost}/api/products/httpnosql/update`,
  httpnosqlDeleteData: `${apiHost}/api/products/httpnosql/delete`,
}