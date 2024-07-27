import { KvModel } from "../schemas/kv.schema"

export async function readKvsByOrgId(orgId: string) {
  const kvs = await KvModel.find({ orgId }).sort({ createdAt: -1 })
  return kvs
}