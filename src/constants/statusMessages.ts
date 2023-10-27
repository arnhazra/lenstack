enum statusMessages {
  connectionError = "Connection Error",
  transactionCreationSuccess = "New Transaction Created",
  transactionCreationError = "Error Creating ERC20 Transaction",
  signOutSuccess = "You are now signed out",
  unauthorized = "Unauthorized",
  subscribeToContinue = "Subscribe to continue",
  invalidPassKey = "Invalid PassKey",
  passKeyEmail = "Check Passkey in Email",
  invalidToken = "Invalid Token",
  invalidUser = "Invalid User",
  mongoDbConnected = "Mongo DB Connected",
  mongoDbConnectionErr = "Mongo DB Connection Error",
  redisConnected = "Redis Connected",
  apiKeyLimitReached = "API Key Limit Reached",
  invalidApiKey = "Invalid API Key",
  apiKeyExpired = "API Key Expired",
  noApiKey = "No API Key Provided",
  subscriptionSuccess = "You are subscribed now",
  subscriptionFailure = "Subscription failed",
  unsubscribeSuccess = "Successfully unsubscribed",
  unsubscribeFailure = "Unsubscribe failed"
}

export { statusMessages }