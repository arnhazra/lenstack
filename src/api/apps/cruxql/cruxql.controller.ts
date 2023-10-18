import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { CruxqlService } from "./cruxql.service"
import { PurchaseDbDto } from "./dto/purchase-db.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("cruxql")
export class CruxqlController {
  constructor(private readonly cruxqlService: CruxqlService) { }

  @Post("getavailabledblist")
  async getAvailableDbList() {
    try {
      const dbList = await this.cruxqlService.getAvailableDbList()
      return { dbList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getmydblist")
  async getMyDbList(@TokenAuthorizer() userId: string) {
    try {
      const myDbList = await this.cruxqlService.getMyDbList(userId)
      return { myDbList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("purchasedb")
  async purchaseDb(@ApiKeyAuthorizer() userId: string, @Body() purchaseDbDto: PurchaseDbDto) {
    try {
      await this.cruxqlService.purchaseDb(userId, purchaseDbDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewdatabase")
  async viewDatabase(@TokenAuthorizer() userId: string, @Body("dbId") dbId: string) {
    try {
      const dataBase = await this.cruxqlService.viewDatabase(userId, dbId)
      return { dataBase }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
