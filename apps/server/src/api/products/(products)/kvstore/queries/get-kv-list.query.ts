import { KvModel } from "../models/kv.model"

export async function deleteKvById(orgId: string, kvId: string) {
  const item = await KvModel.findOneAndDelete({ orgId, _id: kvId })
  return item
}