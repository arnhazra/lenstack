enum statusMessages {
    connectionError = 'Connection Error',
    transactionCreationSuccess = 'New Transaction Created',
    transactionCreationError = 'Error Creating ERC20 Transaction',
    signOutSuccess = 'You are now signed out',
    unauthorized = 'Unauthorized',
    subscribeToContinue = 'Subscribe to continue',
    invalidAuthCode = 'Invalid Auth Code',
    authCodeEmail = 'Check Auth Code in Email',
    invalidToken = 'Invalid Token',
    invalidUser = 'Invalid User',
    mongoDbConnected = 'Mongo DB Connected',
    mongoDbConnectionErr = 'Mongo DB Connection Error',
    redisConnected = 'Redis Connected',
    apiKeyLimitReached = 'API Key Limit Reached',
    invalidApiKey = 'Invalid API Key',
    apiKeyExpired = 'API Key Expired',
    evolakeErrorMessage = 'Query String & Selected DB cannot be empty',
    subscriptionSuccess = 'You are subscribed now',
    subscriptionFailure = 'Subscription failed',
    unsubscribeSuccess = 'Successfully unsubscribed',
    unsubscribeFailure = 'Unsubscribe failed'
}

export { statusMessages }