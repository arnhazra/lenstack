import { KvModel } from "../models/kv.model"

export async function deleteKvById(workspaceId: string, kvId: string) {
  const item = await KvModel.findOneAndDelete({ workspaceId, _id: kvId })
  return item
}