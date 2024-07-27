import { Controller, Post, Body, Query, BadRequestException, Get, Delete } from "@nestjs/common"
import { OrganizationService } from "./organization.service"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/auth/token-authorizer.decorator"
import { statusMessages } from "src/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService, private readonly eventEmitter: EventEmitter2) { }

  @Post("create")
  async createOrganization(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() createOrganizationDto: CreateOrganizationDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "organization", method: "POST", api: "/create" })
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
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "organization", method: "GET", api: "/findmyorganizations" })
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
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "organization", method: "POST", api: "/switch" })
      return await this.organizationService.switchOrganization(user.userId, orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Delete("delete")
  async deleteOrganization(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("orgId") orgId: string) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "organization", method: "DELETE", api: "/delete" })
      return await this.organizationService.deleteOrganization(user.userId, orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
