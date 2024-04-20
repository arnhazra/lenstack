import { kvstoreDatabaseConn } from "../../../../../lib/connect-databases"
import { KvSchema } from "../schemas/kv.schema"

export const KvModel = kvstoreDatabaseConn.model("kv", KvSchema)