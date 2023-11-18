import { config } from "dotenv"
config()

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  apiPort: process.env.API_PORT,
  lenstackPlatformDbUri: process.env.LENSTACK_PLATFORM_DB_URI,
  airlakeMongoDbUri: process.env.LENSTACK_DATALAKE_DB_URI,
  frostlakeMongoDbUri: process.env.LENSTACK_INSIGHTS_DB_URI,
  hyperedgeMongoDbUri: process.env.LENSTACK_FABRIC_DB_URI,
  payMongoDbUri: process.env.LENSTACK_PAY_DB_URI,
  hexscanMongoDbUri: process.env.LENSTACK_LEDGERSCAN_DB_URI,
  snowlakeMongoDbUri: process.env.LENSTACK_NFTSTUDIO_DB_URI,
  swapstreamMongoDbUri: process.env.LENSTACK_SWAP_DB_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  infuraGateway: process.env.INFURA_WEB3_GATEWAY,
  quicknodeGateway: process.env.QUICKNODE_WEB3_GATEWAY,
  alchemyGateway: process.env.ALCHEMY_WEB3_GATEWAY,
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