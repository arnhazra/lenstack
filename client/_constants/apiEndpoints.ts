const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lenstack.vercel.app"

const endPoints = {
  infuraEndpoint: `https://polygon-mumbai.infura.io/v3`,
  getdocumentation: `${apiHost}/api/documentation/getallbyappname`,
  generatePassKeyEndpoint: `${apiHost}/api/user/generatepasskey`,
  verifyPassKeyEndpoint: `${apiHost}/api/user/verifypasskey`,
  userDetailsEndpoint: `${apiHost}/api/user/userdetails`,
  signOutEndpoint: `${apiHost}/api/user/signout`,
  subscribeEndpoint: `${apiHost}/api/subscription/subscribe`,
  activateTrialEndpoint: `${apiHost}/api/subscription/activatetrial`,
  getUsageByApiKeyEndpoint: `${apiHost}/api/subscription/getusagebyapikey`,
  getPlatformConfigEndpoint: `${apiHost}/api/common/getplatformconfig`,
  getSubscriptionConfigEndpoint: `${apiHost}/api/common/getsubscriptionconfig`,
  getSecretConfig: `${apiHost}/api/common/getsecretconfig`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  airlakeFiltersEndpoint: `${apiHost}/api/airlake/filters`,
  airlakeFindDatasetsEndpoint: `${apiHost}/api/airlake/finddatasets`,
  airlakeViewDatasetsEndpoint: `${apiHost}/api/airlake/viewdataset`,
  airlakeFindSimilarDatasetsEndpoint: `${apiHost}/api/airlake/findsimilardatasets`,
  airlakeDataApiEndpoint: `${apiHost}/api/airlake/dataapi`,
  edgepayCreateTxEndpoint: `${apiHost}/api/edgepay/createtx`,
  frostlakeCreateProjectEndpoint: `${apiHost}/api/frostlake/createproject`,
  frostlakeGetProjectsEndpoint: `${apiHost}/api/frostlake/getprojects`,
  frostlakeViewProjectEndpoint: `${apiHost}/api/frostlake/viewproject`,
  frostlakeDeleteProjectEndpoint: `${apiHost}/api/frostlake/deleteproject`,
  frostlakeCreateAnalyticsEndpoint: `${apiHost}/api/frostlake/createanalytics`,
  snowlakeCreateTxEndpoint: `${apiHost}/api/snowlake/createtx`,
  swapstreamCreateTxEndpoint: `${apiHost}/api/swapstream/createtx`,
  hyperedgeCreateDbEndpoint: `${apiHost}/api/hyperedge/createdb`,
  hyperedgeGetMyDbsEndpoint: `${apiHost}/api/hyperedge/getmydbs`,
  hyperedgeViewDbEndpoint: `${apiHost}/api/hyperedge/viewdbfromplatform`,
  hyperedgeDeleteDbEndpoint: `${apiHost}/api/hyperedge/deletedb`,
  hyperedgeCreateKvEndpoint: `${apiHost}/api/hyperedge/createkv`,
  hyperedgeDeleteKvEndpoint: `${apiHost}/api/hyperedge/deletekv`,
  swapstreamTokenConfigEndpoint: `${apiHost}/api/swapstream/getswapstreamtokenconfig`,
}

export default endPoints