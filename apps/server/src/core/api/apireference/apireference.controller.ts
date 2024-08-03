import { Controller, BadRequestException, Get, Query } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/auth/token-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService, private readonly eventEmitter: EventEmitter2) { }

  @Get()
  async getApiReferenceByProductName(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("productName") productName: string) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "apireference", method: "GET", api: "/apireference" })
      const docList = await this.apireferenceService.getApiReferenceByProductName(productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
