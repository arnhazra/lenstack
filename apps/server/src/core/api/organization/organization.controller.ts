import { Controller, Post, Body, BadRequestException, Get, Delete, UseGuards, Request, Param, Patch, UseInterceptors } from "@nestjs/common"
import { OrganizationService } from "./organization.service"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"
import { TokenInterceptor } from "src/auth/token.interceptor"

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @UseGuards(TokenGuard)
  @UseInterceptors(TokenInterceptor)
  @Post()
  async createOrganization(@Request() request: ModRequest, @Body() createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.organizationService.createOrganization(request.user.userId, createOrganizationDto)
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @UseInterceptors(TokenInterceptor)
  @Get()
  async findMyOrganizations(@Request() request: ModRequest,) {
    try {
      return await this.organizationService.findMyOrganizations(request.user.userId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @UseInterceptors(TokenInterceptor)
  @Delete("/:orgId")
  async deleteOrganization(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.organizationService.deleteOrganization(request.user.userId, params.orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @UseInterceptors(TokenInterceptor)
  @Patch("/:orgId")
  async updateAttribute(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.organizationService.updateAttribute(request.user.userId, params.orgId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
