import { Injectable } from "@nestjs/common"
import { CruxqlDbListModel } from "./entities/cruxql-dblist.entity"
import { CruxqlDbOwnershipModel } from "./entities/cruxql-dbownership.entity"

@Injectable()
export class CruxqlRepository {
  async findAllAvailableDb() {
    const dbList = await CruxqlDbListModel.find({ isSold: false }).select("-connectionString")
    return dbList
  }

  async findAllDbByUserId(userId: string) {
    const myDbList = await CruxqlDbOwnershipModel.find({ owner: userId })
    return myDbList
  }

  async createNewDbOwnership(owner: string, dbRelationId: string, apiKey: string) {
    const newOwnership = new CruxqlDbOwnershipModel({ owner, dbRelationId, apiKey })
    await newOwnership.save()
    return true
  }

  async updateAvailableDbListAfterPurchase(dbId: string) {
    await CruxqlDbListModel.findByIdAndDelete(dbId, { isSold: true })
  }

  async findDbByIdWithoutConnectionString(dbId: string) {
    const dbWithoutConnectionString = await CruxqlDbListModel.findById(dbId).select("-connectionString")
    return dbWithoutConnectionString
  }

  async findDbById(dbId: string) {
    const db = await CruxqlDbListModel.findById(dbId)
    return db
  }
}
