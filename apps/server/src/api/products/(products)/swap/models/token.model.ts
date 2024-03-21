import { swapDatabaseConn } from "../../../../../lib/db-connect"
import { TokenSchema } from "../schemas/token.schema"

export const TokenModel = swapDatabaseConn.model("token", TokenSchema)