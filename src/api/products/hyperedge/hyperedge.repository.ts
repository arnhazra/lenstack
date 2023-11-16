import { Injectable } from "@nestjs/common"
import { HyperedgeDbModel } from "./entities/hyperedge-db.entity"
import { HyperedgeKvModel } from "./entities/hyperedge-kv.entity"

@Injectable()
export class HyperedgeRepository {
  async countDbs(workspaceId: string) {
    const count = await HyperedgeDbModel.find({ workspaceId }).estimatedDocumentCount()
    return count
  }

  async createDb(workspaceId: string, name: string, dbId: string, dbPassword: string) {
    const db = new HyperedgeDbModel({ workspaceId, name, dbId, dbPassword })
    await db.save()
    return db
  }

  async getDbsByWorkspaceId(workspaceId: string, searchQuery: string) {
    const dbs = await HyperedgeDbModel.find({
      name: { $regex: searchQuery, $options: "i" },
      workspaceId: workspaceId
    })
    return dbs
  }

  async findDbById(dbId: string) {
    const db = await HyperedgeDbModel.findById(dbId)
    return db
  }

  async findDb(dbId: string, dbPassword: string) {
    const db = await HyperedgeDbModel.findOne({ dbId, dbPassword })
    return db
  }

  async findKvsByDbId(workspaceId: string, dbId: string) {
    const kvs = await HyperedgeKvModel.find({ workspaceId, dbId }).select("-workspaceId -dbId").sort({ createdAt: -1 })
    return kvs
  }

  async deleteDbById(workspaceId: string, dbId: string) {
    await HyperedgeKvModel.deleteMany({ workspaceId, dbId })
    await HyperedgeDbModel.findByIdAndDelete(dbId)
    return true
  }

  async createKv(workspaceId: string, dbId: string, key: string, value: string) {
    const kvs = new HyperedgeKvModel({ workspaceId, dbId, key, value })
    await kvs.save()
    return true
  }

  async deleteKvById(workspaceId: string, kvId: string) {
    await HyperedgeKvModel.findOneAndDelete({ workspaceId, _id: kvId })
    return true
  }
}
