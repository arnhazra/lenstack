import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { EasenftService } from "./easenft.service"
import { CreateTransactionDto } from "./dto/easenft-tx.dto"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("easenft")
export class EasenftController {
  constructor(private readonly easenftService: EasenftService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      await this.easenftService.createTransaction(createTransactionDto, userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("getmynfts")
  async getMyNfts(@TokenAuthorizer() userId: string) {
    try {
      const myNftList = await this.easenftService.getMyNfts(userId)
      return { myNftList }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
