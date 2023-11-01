import { Injectable } from "@nestjs/common"
import { HyperedgeDbModel } from "./entities/hyperedge-db.entity"
import { HyperedgeKvModel } from "./entities/hyperedge-kv.entity"

@Injectable()
export class HyperedgeRepository {
  async countDbs(userId: string) {
    const count = await HyperedgeDbModel.find({ owner: userId }).count()
    return count
  }

  async createDb(owner: string, name: string, dbId: string, dbPassword: string) {
    const db = new HyperedgeDbModel({ owner, name, dbId, dbPassword })
    await db.save()
    return db
  }

  async getDbsByUserId(owner: string) {
    const dbs = await HyperedgeDbModel.find({ owner })
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

  async findKvsByDbId(owner: string, dbId: string) {
    const kvs = await HyperedgeKvModel.find({ owner, dbId }).select("-apiKey -owner -dbId").sort({ createdAt: -1 })
    return kvs
  }

  async deleteDbById(owner: string, dbId: string) {
    await HyperedgeKvModel.deleteMany({ owner, dbId })
    await HyperedgeDbModel.findByIdAndDelete(dbId)
    return true
  }

  async createKv(userId: string, dbId: string, key: string, value: string) {
    const kvs = new HyperedgeKvModel({ owner: userId, dbId, key, value })
    await kvs.save()
    return true
  }

  async deleteKvById(owner: string, kvId: string) {
    await HyperedgeKvModel.findOneAndDelete({ owner, _id: kvId })
    return true
  }
}
