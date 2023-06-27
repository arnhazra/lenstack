const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://lenstack.vercel.app'

const endPoints = {
    getAnalyticsByUserEndpoint: `${apiHost}/api/analytics/getbyuser`,
    generateQueryEndpoint: `${apiHost}/api/query/generate`,
    createTransactionEndpoint: `${apiHost}/api/transaction/create`,
    getTransactionsEndpoint: `${apiHost}/api/transaction/getlistbyuser`,
    requestAuthCodeEndpoint: `${apiHost}/api/user/requestAuthCode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/user/verifyauthcode`,
    userDetailsEndpoint: `${apiHost}/api/user/user`,
    signOutEndpoint: `${apiHost}/api/user/signout`,
    subscribeEndpoint: `${apiHost}/api/user/subscribe`,
    unsubscribeEndpoint: `${apiHost}/api/user/unsubscribe`,
    polygonScanEndpoint: `https://mumbai.polygonscan.com/tx`,
    infuraEndpoint: `https://polygon-mumbai.infura.io/v3/fcb2c26ca13f46a591ed0822c3565c50`
}

export default endPoints