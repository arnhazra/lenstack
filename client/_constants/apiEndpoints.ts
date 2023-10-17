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
  airlakePreviewDataApiEndpoint: `${apiHost}/api/airlake/previewdataapi`,
  airlakeDataApiEndpoint: `${apiHost}/api/airlake/dataapi`,
  dwalletCreateTxEndpoint: `${apiHost}/api/dwallet/createtx`,
  swapstreamCreateTxEndpoint: `${apiHost}/api/swapstream/createtx`,
  snowlakeCreateTxEndpoint: `${apiHost}/api/snowlake/createtx`,
  frostlakeCreateProjectEndpoint: `${apiHost}/api/frostlake/createproject`,
  frostlakeGetProjectsEndpoint: `${apiHost}/api/frostlake/getprojects`,
  frostlakeViewProjectEndpoint: `${apiHost}/api/frostlake/viewproject`,
  frostlakeDeleteProjectEndpoint: `${apiHost}/api/frostlake/deleteproject`,
  frostlakeCreateAnalyticsEndpoint: `${apiHost}/api/frostlake/createanalytics`,
  wealthnowCreatePortfolioEndpoint: `${apiHost}/api/wealthnow/createportfolio`,
  wealthnowGetPortfoliosEndpoint: `${apiHost}/api/wealthnow/getportfolios`,
  wealthnowViewPortfolioEndpoint: `${apiHost}/api/wealthnow/viewportfolio`,
  wealthnowDeletePortfolioEndpoint: `${apiHost}/api/wealthnow/deleteportfolio`,
  wealthnowCreateAssetEndpoint: `${apiHost}/api/wealthnow/createasset`,
  wealthnowViewAssetEndpoint: `${apiHost}/api/wealthnow/viewasset`,
  wealthnowEditAssetEndpoint: `${apiHost}/api/wealthnow/editasset`,
  wealthnowDeleteAssetEndpoint: `${apiHost}/api/wealthnow/deleteasset`,
  getSwapstreamTokenConfig: `${apiHost}/api/swapstream/getswapstreamtokenconfig`,
  cruxqlGetAvailableDbList: `${apiHost}/api/cruxql/getavailabledblist`,
  cruxqlGetMyDbList: `${apiHost}/api/cruxql/getmydblist`,
  cruxqlPurchaseDb: `${apiHost}/api/cruxql/purchasedb`,
}

export default endPoints