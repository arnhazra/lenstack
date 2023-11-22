import { Injectable } from "@nestjs/common"
import { DbModel } from "./entities/db.entity"
import { KvModel } from "./entities/kv.entity"

@Injectable()
export class FabricRepository {
  async countDbs(workspaceId: string) {
    const count = await DbModel.find({ workspaceId }).countDocuments()
    return count
  }

  async createDb(workspaceId: string, name: string, dbId: string, dbPassword: string) {
    const db = new DbModel({ workspaceId, name, dbId, dbPassword })
    await db.save()
    return db
  }

  async getDbsByWorkspaceId(workspaceId: string, searchQuery: string) {
    const dbs = await DbModel.find({
      name: { $regex: searchQuery, $options: "i" },
      workspaceId: workspaceId
    })
    return dbs
  }

  async findDbById(dbId: string) {
    const db = await DbModel.findById(dbId)
    return db
  }

  async findDb(dbId: string, dbPassword: string) {
    const db = await DbModel.findOne({ dbId, dbPassword })
    return db
  }

  async findKvsByDbId(workspaceId: string, dbId: string) {
    const kvs = await KvModel.find({ workspaceId, dbId }).select("-workspaceId -dbId").sort({ createdAt: -1 })
    return kvs
  }

  async deleteDbById(workspaceId: string, dbId: string) {
    await KvModel.deleteMany({ workspaceId, dbId })
    await DbModel.findByIdAndDelete(dbId)
    return true
  }

  async createKv(workspaceId: string, dbId: string, key: string, value: string) {
    const kvs = new KvModel({ workspaceId, dbId, key, value })
    await kvs.save()
    return true
  }

  async deleteKvById(workspaceId: string, kvId: string) {
    await KvModel.findOneAndDelete({ workspaceId, _id: kvId })
    return true
  }
}
