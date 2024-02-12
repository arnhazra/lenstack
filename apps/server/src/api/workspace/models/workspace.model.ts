import { platformMongoDbConn } from "src/lib/db-connect"
import { WorkspaceSchema } from "../schemas/workspace.schema"

export const WorkspaceModel = platformMongoDbConn.model("workspace", WorkspaceSchema)