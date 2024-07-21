import { platformDatabaseConn } from "src/lib/connect-databases"
import { SolutionSchema } from "../schemas/solutions.schema"

export const SolutionModel = platformDatabaseConn.model("solution", SolutionSchema)