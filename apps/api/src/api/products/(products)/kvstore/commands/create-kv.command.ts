import { KvModel } from "../models/kv.model"

export async function createKv(workspaceId: string, key: string, value: string) {
  const kvs = new KvModel({ workspaceId, key, value })
  await kvs.save()
  return true
}