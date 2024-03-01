import { kvstoreMongoDbConn } from "../../../../lib/db-connect"
import { KvSchema } from "../schemas/kv.schema"

export const KvModel = kvstoreMongoDbConn.model("kv", KvSchema)