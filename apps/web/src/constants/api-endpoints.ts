import { uiConstants } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://${uiConstants.brandName}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${uiConstants.brandName}.vercel.app`

export const endPoints = {
  getapireference: `${apiHost}/api/apireference/get`,
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  userTxGateway: `${apiHost}/api/user/txgateway`,
  updateCarbonSettings: `${apiHost}/api/user/updatecarbonsettings`,
  getSubscriptionConfig: `${apiHost}/api/subscription/getsubscriptionconfig`,
  createCheckoutSession: `${apiHost}/api/subscription/create-checkout-session`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  getProductConfig: `${apiHost}/api/products/getproductconfig`,
  getSolutionConfig: `${apiHost}/api/products/getsolutionconfig`,
  analyticsView: `${apiHost}/api/products/analytics/get`,
  analyticsCreate: `${apiHost}/api/products/analytics/create`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  datamarketplaceFilters: `${apiHost}/api/products/datamarketplace/filters`,
  datamarketplaceFindDatasets: `${apiHost}/api/products/datamarketplace/finddatasets`,
  datamarketplaceViewDatasets: `${apiHost}/api/products/datamarketplace/viewdataset`,
  datamarketplaceFindSimilarDatasets: `${apiHost}/api/products/datamarketplace/findsimilardatasets`,
  datamarketplaceDataApi: `${apiHost}/api/products/datamarketplace/dataapi`,
  kvstoreCreateKv: `${apiHost}/api/products/kvstore/createkv`,
  kvstoreReadKvList: `${apiHost}/api/products/kvstore/readkv`,
  kvstoreDeleteKv: `${apiHost}/api/products/kvstore/deletekv`,
  nftstudioTxGateway: `${apiHost}/api/products/nftstudio/txgateway`,
  nftstudioGetContractAddress: `${apiHost}/api/products/nftstudio/getnftcontractaddress`,
}