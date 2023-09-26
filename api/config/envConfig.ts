import { config } from "dotenv"
config({ path: "../.env" })

export const envConfig = {
    apiPort: process.env.API_PORT,
    mainLenstackMongoUri: process.env.MAIN_LENSTACK_MONGO_URI,
    airlakeMongoUri: process.env.AIRLAKE_MONGO_URI,
    frostlakeMongoUri: process.env.FROSTLAKE_MONGO_URI,
    evolakeMongoUri: process.env.EVOLAKE_MONGO_URI,
    wealthnowMongoUri: process.env.WEALTHNOW_MONGO_URI,
    redisSocketHost: process.env.REDIS_SOCKET,
    redisPassword: process.env.REDIS_PASSWORD,
    redisPort: process.env.REDIS_PORT,
    openAIApiKey: process.env.OPENAI_API_KEY,
    infuraApiKey: process.env.INFURA_API_KEY,
    otpKey: process.env.OTP_KEY,
    redirectUri: process.env.GCLOUD_REDIRECT_URI,
    clientId: process.env.GCLOUD_CLIENT_ID,
    clientSecret: process.env.GCLOUD_CLIENT_SECRET,
    refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
    mailerEmail: process.env.MAILER_EMAIL,
    authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
    authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
    tokenContractAddress: process.env.TOKEN_CONTRACT_ADDRESS,
    vendorContractAddress: process.env.VENDOR_CONTRACT_ADDRESS,
    nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
    prototypeContractAddress: process.env.PROTOTYPE_CONTRACT_ADDRESS,
    nodeEnv: process.env.NODE_ENV,
}