import { config } from "dotenv"
config()

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  apiPort: process.env.API_PORT,
  lenstackMongoDbUri: process.env.LENSTACK_MAIN_DB_URI,
  airlakeMongoDbUri: process.env.AIRLAKE_DB_URI,
  cruxqlMongoDbUri: process.env.CRUXQL_DB_URI,
  dwalletMongoDbUri: process.env.DWALLET_DB_URI,
  easenftMongoDbUri: process.env.EASENFT_DB_URI,
  frostlakeMongoDbUri: process.env.FROSTLAKE_DB_URI,
  snowlakeMongoDbUri: process.env.SNOWLAKE_DB_URI,
  swapstreamMongoDbUri: process.env.SWAPSTREAM_DB_URI,
  wealthnowMongoDbUri: process.env.WEALTHNOW_DB_URI,
  vuelockMongoDbUri: process.env.VUELOCK_DB_URI,
  redisSocketHost: process.env.REDIS_SOCKET,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  infuraApiKey: process.env.INFURA_API_KEY,
  passkeyHashingKey: process.env.PASSKEY_HASHING_KEY,
  redirectUri: process.env.GCLOUD_REDIRECT_URI,
  clientId: process.env.GCLOUD_CLIENT_ID,
  clientSecret: process.env.GCLOUD_CLIENT_SECRET,
  refreshToken: process.env.GCLOUD_REFRESH_TOKEN,
  mailerEmail: process.env.MAILER_EMAIL,
  authPrivateKey: process.env.AUTH_RSA_PRIVATE_KEY,
  authPublicKey: process.env.AUTH_RSA_PUBLIC_KEY,
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
  prototypeContractAddress: process.env.PROTOTYPE_CONTRACT_ADDRESS,
  lenstackNpaWalletAddress: process.env.LENSTACK_NPA_WALLET_ADDRESS
}