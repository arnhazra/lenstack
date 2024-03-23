import { platformDatabaseConn } from "src/lib/connect-databases"
import { WorkspaceSchema } from "../schemas/workspace.schema"

export const WorkspaceModel = platformDatabaseConn.model("workspace", WorkspaceSchema)