import { platformMongoDbConn } from "../../../lib/db-connect"
import { UserSchema } from "../schemas/user.schema"

export const UserModel = platformMongoDbConn.model("user", UserSchema)
