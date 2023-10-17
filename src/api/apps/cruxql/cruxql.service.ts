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
      return myDbList
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
}
