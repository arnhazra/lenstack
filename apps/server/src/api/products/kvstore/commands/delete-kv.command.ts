import { KvModel } from "../models/kv.model"

export async function readKvsByWorkspaceId(workspaceId: string) {
  const kvs = await KvModel.find({ workspaceId }).sort({ createdAt: -1 })
  return kvs
}