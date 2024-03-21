import { platformDatabaseConn } from "../../../lib/db-connect"
import { UserSchema } from "../schemas/user.schema"

export const UserModel = platformDatabaseConn.model("user", UserSchema)
