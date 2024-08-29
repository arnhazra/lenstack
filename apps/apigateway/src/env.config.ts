import { config } from "dotenv"
config({ path: "./.env.development" })

export const envConfig = {
  apiPort: process.env.API_PORT,
  nodeEnv: process.env.NODE_ENV,
  brandName: process.env.BRAND_NAME,
  coreDatabaseURI: process.env.CORE_DATABASE_URI,
  productsDatabaseURI: process.env.PRODUCTS_DATABASE_URI,
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
}