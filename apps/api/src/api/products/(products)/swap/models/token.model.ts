import { swapDatabaseConn } from "../../../../../lib/connect-databases"
import { TokenSchema } from "../schemas/token.schema"

export const TokenModel = swapDatabaseConn.model("token", TokenSchema)