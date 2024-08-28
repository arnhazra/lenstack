import { config } from "dotenv"
config({ path: "./.env.development" })

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  brandName: process.env.BRAND_NAME,
  rabbitMqURI: process.env.RABBITMQ_URI,
  redirectURI: process.env.GCLOUD_REDIRECT_URI,
  gcloudClientId: process.env.GCLOUD_CLIENT_ID,
  gcloudClientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
}