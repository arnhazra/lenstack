import { swapMongoDbConn } from "../../../../../lib/db-connect"
import { TokenSchema } from "../schemas/token.schema"

export const TokenModel = swapMongoDbConn.model("token", TokenSchema)