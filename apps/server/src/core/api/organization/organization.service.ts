import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { createOrganizationCommand } from "./commands/create-organization.command"
import { findMyOrganizationsQuery } from "./queries/find-org.query"
import { findOrganizationByIdQuery } from "./queries/find-org-by-id.query"
import { switchOrganizationCommand } from "./commands/switch-organization.command"
import { deleteOrganizationCommand } from "./commands/delete-organization.command"

@Injectable()
export class OrganizationService {
  async createOrganization(userId: string, createOrganizationDto: CreateOrganizationDto) {
    try {
      const { name } = createOrganizationDto
      const organizationCount = (await findMyOrganizationsQuery(userId)).length
      if (organizationCount < 10) {
        const organization = await createOrganizationCommand(name, userId)
        return organization
      }

      else {
        throw new BadRequestException(statusMessages.organizationLimitReached)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyOrganizations(userId: string) {
    try {
      const organizations = await findMyOrganizationsQuery(userId)
      return organizations
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async switchOrganization(reqUserId: string, orgId: string) {
    try {
      const { userId } = await findOrganizationByIdQuery(orgId)

      if (userId.toString() === reqUserId) {
        await switchOrganizationCommand(reqUserId, orgId)
        return { success: true }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async deleteOrganization(reqUserId: string, orgId: string) {
    try {
      const { userId } = await findOrganizationByIdQuery(orgId)

      if (userId.toString() === reqUserId) {
        await deleteOrganizationCommand(orgId)
        return { success: true }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
