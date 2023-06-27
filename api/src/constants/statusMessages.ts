enum statusMessages {
    connectionError = 'Connection Error',
    transactionCreationSuccess = 'New Transaction Created',
    transactionCreationError = 'Error Creating ERC20 Transaction',
    signOutSuccess = 'You are now signed out. Thanks for using the app',
    unauthorized = 'Unauthorized',
    invalidAuthCode = 'Invalid Auth Code',
    authCodeEmail = 'Check Auth Code in Email',
    invalidToken = 'Invalid Token',
    invalidUser = 'Invalid User',
    mongoDbConnected = 'Mongo DB Connected',
    mongoDbConnectionErr = 'Mongo DB Connection Error',
    redisConnected = 'Redis Connected',
    apiKeyLimitReached = 'API Key Limit Reached',
    invalidApiKey = 'Invalid API Key'
}

export default statusMessages