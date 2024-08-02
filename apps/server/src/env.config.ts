import { config } from "dotenv"
config({ path: "../../.env" })

export const envConfig = {
  apiPort: process.env.API_PORT,
  nodeEnv: process.env.NODE_ENV,
  brandName: process.env.BRAND_NAME,
  platformDatabaseURI: process.env.PLATFORM_DATABASE_URI,
  analyticsDatabaseURI: process.env.ANALYTICS_DATABASE_URI,
  blockchainDatabaseURI: process.env.BLOCKCHAIN_DATABASE_URI,
  copilotDatabaseURI: process.env.COPILOT_DATABASE_URI,
  datamarketplaceDatabaseURI: process.env.DATAMARKETPLACE_DATABASE_URI,
  httpnosqlDatabaseURI: process.env.HTTPNOSQL_DATABASE_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  geminiAPIKey: process.env.GEMINI_API_KEY,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  redirectURI: process.env.GCLOUD_REDIRECT_URI,
  gcloudClientId: process.env.GCLOUD_CLIENT_ID,
  gcloudClientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
  authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
}