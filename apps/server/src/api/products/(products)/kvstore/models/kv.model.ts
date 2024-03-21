import { kvstoreDatabaseConn } from "../../../../../lib/db-connect"
import { KvSchema } from "../schemas/kv.schema"

export const KvModel = kvstoreDatabaseConn.model("kv", KvSchema)