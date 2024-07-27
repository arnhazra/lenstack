import { Controller, Post, Body, Query, BadRequestException, Get } from "@nestjs/common"
import { OrganizationService } from "./organization.service"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { statusMessages } from "src/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService, private readonly eventEmitter: EventEmitter2) { }

  @Post("create")
  async createOrganization(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() createOrganizationDto: CreateOrganizationDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "organization", method: "POST", api: "/create" })
      const organization = await this.organizationService.createOrganization(user.userId, createOrganizationDto)
      return organization
    }

    catch (error) {
      throw error
    }
  }

  @Get("findmyorganizations")
  async findMyOrganizations(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "organization", method: "GET", api: "/findmyorganizations" })
      const myOrganizations = await this.organizationService.findMyOrganizations(user.userId)
      return { myOrganizations }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("switch")
  async switchOrganization(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("orgId") orgId: string) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "organization", method: "POST", api: "/switch" })
      return await this.organizationService.switchOrganization(user.userId, orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
