import { BadRequestException, Injectable } from "@nestjs/common"
import { PurchaseDbDto } from "./dto/purchase-db.dto"
import { CruxqlRepository } from "./cruxql.repository"

@Injectable()
export class CruxqlService {
  constructor(private readonly cruxqlRepository: CruxqlRepository) { }

  async getAvailableDbList() {
    try {
      const dbList = await this.cruxqlRepository.findAllAvailableDb()
      return dbList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getMyDbList(userId: string) {
    try {
      const myDbList = await this.cruxqlRepository.findAllDbByUserId(userId)
      const myDbListFormatted = []
      for (const myDb of myDbList) {
        const dbfull = await this.cruxqlRepository.findDbByIdWithoutConnectionString(myDb.dbRelationId as unknown as string)
        myDbListFormatted.push(dbfull)
      }

      return myDbListFormatted
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async purchaseDb(userId: string, purchaseDbDto: PurchaseDbDto) {
    try {
      const { apiKey, dbId } = purchaseDbDto
      await this.cruxqlRepository.createNewDbOwnership(userId, dbId, apiKey)
      await this.cruxqlRepository.updateAvailableDbListAfterPurchase(dbId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDatabase(userId: string, dbId: string) {
    try {
      const myDbList = await this.cruxqlRepository.findAllDbByUserId(userId)
      let returnWithConnectionString = false

      for (const myDb of myDbList) {
        if (myDb.dbRelationId.toString() === dbId) {
          returnWithConnectionString = true
        }
      }

      if (returnWithConnectionString) {
        const db = await this.cruxqlRepository.findDbById(dbId)
        return db
      }

      else {
        const db = await this.cruxqlRepository.findDbByIdWithoutConnectionString(dbId)
        return db
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
