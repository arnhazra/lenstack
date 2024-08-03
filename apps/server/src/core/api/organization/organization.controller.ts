import { Controller, Post, Body, Query, BadRequestException, Get, Delete, UseGuards, Request } from "@nestjs/common"
import { OrganizationService } from "./organization.service"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @UseGuards(TokenGuard)
  @Post("create")
  async createOrganization(@Request() request: ModRequest, @Body() createOrganizationDto: CreateOrganizationDto) {
    try {
      const organization = await this.organizationService.createOrganization(request.user.userId, createOrganizationDto)
      return organization
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get("findmyorganizations")
  async findMyOrganizations(@Request() request: ModRequest,) {
    try {
      const myOrganizations = await this.organizationService.findMyOrganizations(request.user.userId)
      return { myOrganizations }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Post("switch")
  async switchOrganization(@Request() request: ModRequest, @Query("orgId") orgId: string) {
    try {
      return await this.organizationService.switchOrganization(request.user.userId, orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Delete("delete")
  async deleteOrganization(@Request() request: ModRequest, @Query("orgId") orgId: string) {
    try {
      return await this.organizationService.deleteOrganization(request.user.userId, orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
