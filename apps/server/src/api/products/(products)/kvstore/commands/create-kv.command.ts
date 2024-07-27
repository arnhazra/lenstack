import { KvModel } from "../models/kv.model"

export async function createKv(orgId: string, key: string, value: string) {
  const kvs = new KvModel({ orgId, key, value })
  await kvs.save()
  return true
}