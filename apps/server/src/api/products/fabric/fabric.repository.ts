import { Injectable } from "@nestjs/common"
import { KvModel } from "./entities/kv.entity"

@Injectable()
export class FabricRepository {
  async createKv(workspaceId: string, key: string, value: string) {
    const kvs = new KvModel({ workspaceId, key, value })
    await kvs.save()
    return true
  }

  async readKvsByWorkspaceId(workspaceId: string) {
    const kvs = await KvModel.find({ workspaceId }).sort({ createdAt: -1 })
    return kvs
  }

  async deleteKvById(workspaceId: string, kvId: string) {
    const item = await KvModel.findOneAndDelete({ workspaceId, _id: kvId })
    return item
  }
}
