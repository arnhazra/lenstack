import { Injectable } from "@nestjs/common"
import { FabricDbModel } from "./entities/fabric-db.entity"
import { FabricKvModel } from "./entities/fabric-kv.entity"

@Injectable()
export class FabricRepository {
  async countDbs(workspaceId: string) {
    const count = await FabricDbModel.find({ workspaceId }).estimatedDocumentCount()
    return count
  }

  async createDb(workspaceId: string, name: string, dbId: string, dbPassword: string) {
    const db = new FabricDbModel({ workspaceId, name, dbId, dbPassword })
    await db.save()
    return db
  }

  async getDbsByWorkspaceId(workspaceId: string, searchQuery: string) {
    const dbs = await FabricDbModel.find({
      name: { $regex: searchQuery, $options: "i" },
      workspaceId: workspaceId
    })
    return dbs
  }

  async findDbById(dbId: string) {
    const db = await FabricDbModel.findById(dbId)
    return db
  }

  async findDb(dbId: string, dbPassword: string) {
    const db = await FabricDbModel.findOne({ dbId, dbPassword })
    return db
  }

  async findKvsByDbId(workspaceId: string, dbId: string) {
    const kvs = await FabricKvModel.find({ workspaceId, dbId }).select("-workspaceId -dbId").sort({ createdAt: -1 })
    return kvs
  }

  async deleteDbById(workspaceId: string, dbId: string) {
    await FabricKvModel.deleteMany({ workspaceId, dbId })
    await FabricDbModel.findByIdAndDelete(dbId)
    return true
  }

  async createKv(workspaceId: string, dbId: string, key: string, value: string) {
    const kvs = new FabricKvModel({ workspaceId, dbId, key, value })
    await kvs.save()
    return true
  }

  async deleteKvById(workspaceId: string, kvId: string) {
    await FabricKvModel.findOneAndDelete({ workspaceId, _id: kvId })
    return true
  }
}
