import { KvModel } from "../models/kv.model"

export async function readKvsByOrgId(orgId: string) {
  const kvs = await KvModel.find({ orgId }).sort({ createdAt: -1 })
  return kvs
}