import { config } from "dotenv"
config({ path: "./.env.development" })

export const envConfig = {
  apiPort: process.env.API_PORT,
  nodeEnv: process.env.NODE_ENV,
  brandName: process.env.BRAND_NAME,
  rabbitMqURI: process.env.RABBITMQ_URI,
  coreDatabaseURI: process.env.CORE_DATABASE_URI,
  copilotDatabaseURI: process.env.COPILOT_DATABASE_URI,
  datamarketplaceDatabaseURI: process.env.DATAMARKETPLACE_DATABASE_URI,
  httpnosqlDatabaseURI: process.env.HTTPNOSQL_DATABASE_URI,
  identityDatabaseURI: process.env.IDENTITY_DATABASE_URI,
  webanalyticsDatabaseURI: process.env.WEBANALYTICS_DATABASE_URI,
  redisURI: process.env.REDIS_URI,
  geminiAPIKey: process.env.GEMINI_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_RSA_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_RSA_PUBLIC_KEY,
}