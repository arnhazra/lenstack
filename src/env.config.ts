import { config } from "dotenv"
config()

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  apiPort: process.env.API_PORT,
  platformDbUri: process.env.PLATFORM_DB_URI,
  datalakeMongoDbUri: process.env.DATALAKE_DB_URI,
  insightsMongoDbUri: process.env.INSIGHTS_DB_URI,
  fabricMongoDbUri: process.env.FABRIC_DB_URI,
  walletMongoDbUri: process.env.WALLET_DB_URI,
  ledgerscanMongoDbUri: process.env.LEDGERSCAN_DB_URI,
  nftstudioMongoDbUri: process.env.NFTSTUDIO_DB_URI,
  swapMongoDbUri: process.env.SWAP_DB_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  alchemyGateway: process.env.ALCHEMY_WEB3_GATEWAY,
  getblockGateway: process.env.GETBLOCK_WEB3_GATEWAY,
  infuraGateway: process.env.INFURA_WEB3_GATEWAY,
  quicknodeGateway: process.env.QUICKNODE_WEB3_GATEWAY,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  redirectUri: process.env.GCLOUD_REDIRECT_URI,
  gcloudClientId: process.env.GCLOUD_CLIENT_ID,
  gcloudClientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
  authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
  polygonscanSecretKey: process.env.POLYGONSCAN_SECRET_KEY,
  brandName: process.env.BRAND_NAME
}