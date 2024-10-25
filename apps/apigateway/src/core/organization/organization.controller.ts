import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Delete,
  UseGuards,
  Request,
  Param,
  Patch,
} from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { statusMessages } from "src/shared/utils/constants/status-messages";
import { TokenGuard } from "src/shared/auth/token.guard";
import { ModRequest } from "src/shared/auth/types/mod-request.interface";

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(TokenGuard)
  @Post()
  async createOrganization(
    @Request() request: ModRequest,
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    try {
      return await this.organizationService.createOrganization(
        request.user.userId,
        createOrganizationDto
      );
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  async findMyOrganizations(@Request() request: ModRequest) {
    try {
      return await this.organizationService.findMyOrganizations(
        request.user.userId
      );
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError);
    }
  }

  @UseGuards(TokenGuard)
  @Delete("/:orgId")
  async deleteOrganization(
    @Request() request: ModRequest,
    @Param() params: any
  ) {
    try {
      return await this.organizationService.deleteOrganization(
        request.user.userId,
        params.orgId
      );
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError);
    }
  }

  @UseGuards(TokenGuard)
  @Patch("/:orgId")
  async updateAttribute(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.organizationService.updateAttribute(
        request.user.userId,
        params.orgId
      );
    } catch (error) {
      throw new BadRequestException(statusMessages.invalidUser);
    }
  }
}
