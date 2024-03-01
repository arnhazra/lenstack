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
  subscribe: `${apiHost}/api/subscription/subscribe`,
  activateHobby: `${apiHost}/api/subscription/activatehobby`,
  getSubscriptionConfig: `${apiHost}/api/subscription/getsubscriptionconfig`,
  subscriptionAlchemyGateway: `${apiHost}/api/subscription/gateway/alchemy`,
  subscriptionGetblockGateway: `${apiHost}/api/subscription/gateway/getblock`,
  subscriptionInfuraGateway: `${apiHost}/api/subscription/gateway/infura`,
  subscriptionQuicknodeGateway: `${apiHost}/api/subscription/gateway/quicknode`,
  getProductConfig: `${apiHost}/api/platform/getproductconfig`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  analyticsView: `${apiHost}/api/products/analytics/get`,
  analyticsCreate: `${apiHost}/api/products/analytics/create`,
  copilotGenerateEndpoint: `${apiHost}/api/products/copilot/generate`,
  dataexchangeFilters: `${apiHost}/api/products/dataexchange/filters`,
  dataexchangeFindDatasets: `${apiHost}/api/products/dataexchange/finddatasets`,
  dataexchangeViewDatasets: `${apiHost}/api/products/dataexchange/viewdataset`,
  dataexchangeFindSimilarDatasets: `${apiHost}/api/products/dataexchange/findsimilardatasets`,
  dataexchangeDataApi: `${apiHost}/api/products/dataexchange/dataapi`,
  kvstoreCreateKv: `${apiHost}/api/products/kvstore/createkv`,
  kvstoreReadKvList: `${apiHost}/api/products/kvstore/readkvlistfromplatform`,
  kvstoreUpdateKv: `${apiHost}/api/products/kvstore/updatekv`,
  kvstoreDeleteKv: `${apiHost}/api/products/kvstore/deletekv`,
  ledgerscanAnalyzer: `${apiHost}/api/products/ledgerscan/analyzer`,
  nftstudioCreateTx: `${apiHost}/api/products/nftstudio/createtx`,
  nftstudioGetContractAddress: `${apiHost}/api/products/nftstudio/getnftcontractaddress`,
  nftstudioTxGateway: `${apiHost}/api/products/nftstudio/txgateway`,
  swapCreateTx: `${apiHost}/api/products/swap/createtx`,
  swapTokenConfig: `${apiHost}/api/products/swap/getswaptokenconfig`,
  swapTxGateway: `${apiHost}/api/products/swap/txgateway`,
  walletCreateTx: `${apiHost}/api/products/wallet/createtx`,
  walletTxGateway: `${apiHost}/api/products/wallet/txgateway`,
}