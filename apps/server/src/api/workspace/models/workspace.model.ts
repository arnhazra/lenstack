import { platformDatabaseConn } from "src/lib/db-connect"
import { WorkspaceSchema } from "../schemas/workspace.schema"

export const WorkspaceModel = platformDatabaseConn.model("workspace", WorkspaceSchema)