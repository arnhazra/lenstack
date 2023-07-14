const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://lenstack.vercel.app'

const endPoints = {
    polygonScanEndpoint: `https://mumbai.polygonscan.com/tx`,
    infuraEndpoint: `https://polygon-mumbai.infura.io/v3`,
    requestAuthCodeEndpoint: `${apiHost}/api/user/requestauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/user/verifyauthcode`,
    userDetailsEndpoint: `${apiHost}/api/user/userdetails`,
    signOutEndpoint: `${apiHost}/api/user/signout`,
    subscribeEndpoint: `${apiHost}/api/user/subscribe`,
    unsubscribeEndpoint: `${apiHost}/api/user/unsubscribe`,
    createTransactionEndpoint: `${apiHost}/api/transaction/create`,
    getTransactionsEndpoint: `${apiHost}/api/transaction/gettxbyuser`,
    getPlatformConfigEndpoint: `${apiHost}/api/common/getplatformconfig`,
    getSubscriptionConfigEndpoint: `${apiHost}/api/common/getsubscriptionconfig`,
    getUsageByApiKeyEndpoint: `${apiHost}/api/common/getusagebyapikey`,
    getContractAddressList: `${apiHost}/api/common/getcontractaddresses`,
    airlakeFiltersEndpoint: `${apiHost}/api/products/airlake/filters`,
    airlakeFindDatasetsEndpoint: `${apiHost}/api/products/airlake/finddatasets`,
    airlakeViewDatasetsEndpoint: `${apiHost}/api/products/airlake/viewdataset`,
    airlakeFindSimilarDatasetsEndpoint: `${apiHost}/api/products/airlake/findsimilardatasets`,
    airlakeGetDatasetHistoryByUserEndpoint: `${apiHost}/api/products/airlake/getdatasethistorybyuser`,
    airlakeMetadataApiEndpoint: `${apiHost}/api/products/airlake/metadataapi`,
    airlakeDataApiEndpoint: `${apiHost}/api/products/airlake/dataapi`,
    evolakeGetDatabaseListEndpoint: `${apiHost}/api/products/evolake/getdblist`,
    evolakeGenerateQueryEndpint: `${apiHost}/api/products/evolake/generatequery`,
    evolakeGetQueryHistoryEndpoint: `${apiHost}/api/products/evolake/getqueryhistory`,
    icelakeCreateDocEndpoint: `${apiHost}/api/products/icelake/createdoc`,
    icelakeGetAllDocEndpoint: `${apiHost}/api/products/icelake/getalldoc`,
    icelakeSaveDocEndpoint: `${apiHost}/api/products/icelake/savedoc`,
    icelakeArchiveDocEndpoint: `${apiHost}/api/products/icelake/archivedoc`,
    snowlakeCreatePrototypeEndpoint: `${apiHost}/api/products/snowlake/createprototype`,
    snowlakeGetAllPrototypesEndpoint: `${apiHost}/api/products/snowlake/getallprototypes`,
    snowlakeViewPrototypeEndpoint: `${apiHost}/api/products/snowlake/viewprototype`,
    snowlakeDeletePrototypeEndpoint: `${apiHost}/api/products/snowlake/deleteprototype`,
    frostlakeGetAnalyticsEndpoint: `${apiHost}/api/products/frostlake/getanalytics`,
    frostlakeCreateAnalyticsEndpoint: `${apiHost}/api/products/frostlake/createanalytics`
}

export default endPoints