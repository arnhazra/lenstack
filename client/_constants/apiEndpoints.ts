const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lenstack.vercel.app"

const endPoints = {
  polygonScanEndpoint: `https://mumbai.polygonscan.com/tx`,
  infuraEndpoint: `https://polygon-mumbai.infura.io/v3`,
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
  airlakeFiltersEndpoint: `${apiHost}/api/airlake/filters`,
  airlakeFindDatasetsEndpoint: `${apiHost}/api/airlake/finddatasets`,
  airlakeViewDatasetsEndpoint: `${apiHost}/api/airlake/viewdataset`,
  airlakeFindSimilarDatasetsEndpoint: `${apiHost}/api/airlake/findsimilardatasets`,
  airlakeDataApiEndpoint: `${apiHost}/api/airlake/dataapi`,
  dwalletCreateTxEndpoint: `${apiHost}/api/dwallet/createtx`,
  easenftCreateTxEndpoint: `${apiHost}/api/easenft/createtx`,
  easenftGetMyNftsEndpoint: `${apiHost}/api/easenft/getmynfts`,
  swapstreamCreateTxEndpoint: `${apiHost}/api/swapstream/createtx`,
  snowlakeCreateTxEndpoint: `${apiHost}/api/snowlake/createtx`,
  frostlakeCreateProjectEndpoint: `${apiHost}/api/frostlake/createproject`,
  frostlakeGetProjectsEndpoint: `${apiHost}/api/frostlake/getprojects`,
  frostlakeViewProjectEndpoint: `${apiHost}/api/frostlake/viewproject`,
  frostlakeDeleteProjectEndpoint: `${apiHost}/api/frostlake/deleteproject`,
  frostlakeCreateAnalyticsEndpoint: `${apiHost}/api/frostlake/createanalytics`,
  getSwapstreamTokenConfig: `${apiHost}/api/swapstream/getswapstreamtokenconfig`,
  getdocumentation: `${apiHost}/api/documentation/getallbyappname`,
  vuelockCreateVaultEndpoint: `${apiHost}/api/vuelock/createvault`,
  vuelockGetMyVaultsEndpoint: `${apiHost}/api/vuelock/getmyvaults`,
  vuelockViewVaultEndpoint: `${apiHost}/api/vuelock/viewvault`,
  vuelockDeleteVaultEndpoint: `${apiHost}/api/vuelock/deletevault`,
  vuelockCreateSecretEndpoint: `${apiHost}/api/vuelock/createsecret`,
  vuelockDeleteSecretEndpoint: `${apiHost}/api/vuelock/deletesecret`,
}

export default endPoints