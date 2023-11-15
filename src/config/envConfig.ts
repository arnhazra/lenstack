import { config } from "dotenv"
config()

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  apiPort: process.env.API_PORT,
  lenstackPlatformDbUri: process.env.LENSTACK_PLATFORM_DB_URI,
  airlakeMongoDbUri: process.env.AIRLAKE_DB_URI,
  edgepayMongoDbUri: process.env.EDGEPAY_DB_URI,
  frostlakeMongoDbUri: process.env.FROSTLAKE_DB_URI,
  snowlakeMongoDbUri: process.env.SNOWLAKE_DB_URI,
  swapstreamMongoDbUri: process.env.SWAPSTREAM_DB_URI,
  hyperedgeMongoDbUri: process.env.HYPEREDGE_DB_URI,
  hexscanMongoDbUri: process.env.HEXSCAN_DB_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  infuraEndpoint: process.env.INFURA_ENDPOINT,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  redirectUri: process.env.GCLOUD_REDIRECT_URI,
  clientId: process.env.GCLOUD_CLIENT_ID,
  clientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
  authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
  lenstackNpaWalletAddress: process.env.LENSTACK_NPA_WALLET_ADDRESS,
  polygonscanSecretKey: process.env.POLYGONSCAN_SECRET_KEY
}