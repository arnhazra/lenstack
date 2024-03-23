import { platformDatabaseConn } from "../../../lib/connect-databases"
import { UserSchema } from "../schemas/user.schema"

export const UserModel = platformDatabaseConn.model("user", UserSchema)
