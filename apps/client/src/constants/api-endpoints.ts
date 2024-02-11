import { uiConstants } from "./global-constants"

export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : `https://${uiConstants.brandName}.vercel.app`
export const uiHost = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${uiConstants.brandName}.vercel.app`

export const endPoints = {
  getapireference: `${apiHost}/api/apireference/get`,
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  alchemyTransactionGateway: `${apiHost}/api/transaction/alchemy-gateway`,
  getblockTransactionGateway: `${apiHost}/api/transaction/getblock-gateway`,
  infuraTransactionGateway: `${apiHost}/api/transaction/infura-gateway`,
  quicknodetransactionGateway: `${apiHost}/api/transaction/quicknode-gateway`,
  subscribe: `${apiHost}/api/subscription/subscribe`,
  activateHobby: `${apiHost}/api/subscription/activatehobby`,
  getSubscriptionConfig: `${apiHost}/api/subscription/getsubscriptionconfig`,
  getProductConfig: `${apiHost}/api/platform/getproductconfig`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  datalakeFilters: `${apiHost}/api/products/datalake/filters`,
  datalakeFindDatasets: `${apiHost}/api/products/datalake/finddatasets`,
  datalakeViewDatasets: `${apiHost}/api/products/datalake/viewdataset`,
  datalakeFindSimilarDatasets: `${apiHost}/api/products/datalake/findsimilardatasets`,
  datalakeDataApi: `${apiHost}/api/products/datalake/dataapi`,
  walletCreateTx: `${apiHost}/api/products/wallet/createtx`,
  insightsViewAnalytics: `${apiHost}/api/products/insights/getanalytics`,
  insightsCreateAnalytics: `${apiHost}/api/products/insights/createanalytics`,
  ledgerscanAnalyzer: `${apiHost}/api/products/ledgerscan/analyzer`,
  fabricCreateKv: `${apiHost}/api/products/fabric/createkv`,
  fabricReadKvList: `${apiHost}/api/products/fabric/readkvlistfromplatform`,
  fabricDeleteKv: `${apiHost}/api/products/fabric/deletekv`,
  nftstudioCreateTx: `${apiHost}/api/products/nftstudio/createtx`,
  nftstudioGetContractAddress: `${apiHost}/api/products/nftstudio/getnftcontractaddress`,
  swapCreateTx: `${apiHost}/api/products/swap/createtx`,
  swapTokenConfig: `${apiHost}/api/products/swap/getswaptokenconfig`,
  getAllActivities: `${apiHost}/api/activity/getactivities`
}