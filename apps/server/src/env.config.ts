import { config } from "dotenv"
config({ path: "../../.env" })

export const envConfig = {
  apiPort: process.env.API_PORT,
  nodeEnv: process.env.NODE_ENV,
  brandName: process.env.BRAND_NAME,
  coreDatabaseURI: process.env.CORE_DATABASE_URI,
  analyticsDatabaseURI: process.env.ANALYTICS_DATABASE_URI,
  blockchainDatabaseURI: process.env.BLOCKCHAIN_DATABASE_URI,
  copilotDatabaseURI: process.env.COPILOT_DATABASE_URI,
  datamarketplaceDatabaseURI: process.env.DATAMARKETPLACE_DATABASE_URI,
  httpnosqlDatabaseURI: process.env.HTTPNOSQL_DATABASE_URI,
  insightsDatabaseURI: process.env.INSIGHTS_DATABASE_URI,
  redisURI: process.env.REDIS_URI,
  geminiAPIKey: process.env.GEMINI_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  redirectURI: process.env.GCLOUD_REDIRECT_URI,
  gcloudClientId: process.env.GCLOUD_CLIENT_ID,
  gcloudClientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_RSA_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_RSA_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_RSA_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_RSA_PRIVATE_KEY,
}