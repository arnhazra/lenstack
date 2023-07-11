import { config } from 'dotenv'
config({ path: '../.env' })

export const envConfig = {
    apiPort: process.env.API_PORT,
    mongoUri: process.env.MONGO_URI,
    redisUri: process.env.REDIS_URI,
    openAIApiKey: process.env.OPENAI_API_KEY,
    otpKey: process.env.OTP_KEY,
    redirectUri: process.env.GCLOUD_REDIRECT_URI,
    clientId: process.env.GCLOUD_CLIENT_ID,
    clientSecret: process.env.GCLOUD_CLIENT_SECRET,
    refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
    mailerEmail: process.env.MAILER_EMAIL,
    authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
    authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
    nodeEnv: process.env.NODE_ENV
}