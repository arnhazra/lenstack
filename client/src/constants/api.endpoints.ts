export const apiHost = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lenstack.vercel.app"

export const endPoints = {
  getapireference: `${apiHost}/api/apireference/getallbyproductname`,
  generatePassKey: `${apiHost}/api/user/generatepasskey`,
  verifyPassKey: `${apiHost}/api/user/verifypasskey`,
  userDetails: `${apiHost}/api/user/userdetails`,
  signOut: `${apiHost}/api/user/signout`,
  subscribe: `${apiHost}/api/subscription/subscribe`,
  activateTrial: `${apiHost}/api/subscription/activatetrial`,
  getSubscriptionConfig: `${apiHost}/api/subscription/getsubscriptionconfig`,
  getSecretConfig: `${apiHost}/api/platform/getsecretconfig`,
  getProductConfig: `${apiHost}/api/platform/getproductconfig`,
  createWorkspace: `${apiHost}/api/workspace/create`,
  findMyWorkspaces: `${apiHost}/api/workspace/findmyworkspaces`,
  switchWorkspace: `${apiHost}/api/workspace/switch`,
  airlakeFilters: `${apiHost}/api/products/airlake/filters`,
  airlakeFindDatasets: `${apiHost}/api/products/airlake/finddatasets`,
  airlakeViewDatasets: `${apiHost}/api/products/airlake/viewdataset`,
  airlakeFindSimilarDatasets: `${apiHost}/api/products/airlake/findsimilardatasets`,
  airlakeDataApi: `${apiHost}/api/products/airlake/dataapi`,
  payCreateTx: `${apiHost}/api/products/pay/createtx`,
  frostlakeCreateProject: `${apiHost}/api/products/frostlake/createproject`,
  frostlakeGetProjects: `${apiHost}/api/products/frostlake/getprojects`,
  frostlakeViewProject: `${apiHost}/api/products/frostlake/viewproject`,
  frostlakeDeleteProject: `${apiHost}/api/products/frostlake/deleteproject`,
  frostlakeCreateAnalytics: `${apiHost}/api/products/frostlake/createanalytics`,
  hexscanAnalyzer: `${apiHost}/api/products/hexscan/analyzer`,
  hyperedgeCreateDb: `${apiHost}/api/products/hyperedge/createdb`,
  hyperedgeGetMyDbs: `${apiHost}/api/products/hyperedge/getmydbs`,
  hyperedgeViewDb: `${apiHost}/api/products/hyperedge/viewdbfromplatform`,
  hyperedgeDeleteDb: `${apiHost}/api/products/hyperedge/deletedb`,
  hyperedgeCreateKv: `${apiHost}/api/products/hyperedge/createkv`,
  hyperedgeDeleteKv: `${apiHost}/api/products/hyperedge/deletekv`,
  snowlakeCreateTx: `${apiHost}/api/products/snowlake/createtx`,
  swapCreateTx: `${apiHost}/api/products/swap/createtx`,
  swapTokenConfig: `${apiHost}/api/products/swap/getswaptokenconfig`,
}