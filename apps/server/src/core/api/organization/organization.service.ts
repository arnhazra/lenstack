import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateOrganizationDto } from "./dto/create-organization.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindAllOrgQuery } from "./queries/impl/find-all-org.query"
import { FindOrgByIdQuery } from "./queries/impl/find-org-by-id.query"
import { Organization } from "./schemas/organization.schema"
import { DeleteOrganizationCommand } from "./commands/impl/delete-organization.command"
import { CreateOrganizationCommand } from "./commands/impl/create-organization.command"

@Injectable()
export class OrganizationService {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) { }

  async createOrganization(userId: string, createOrganizationDto: CreateOrganizationDto) {
    try {
      const { name } = createOrganizationDto
      return await this.commandBus.execute(new CreateOrganizationCommand(name, userId))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyOrganizations(userId: string) {
    try {
      return await this.queryBus.execute(new FindAllOrgQuery(userId))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async deleteOrganization(reqUserId: string, orgId: string) {
    try {
      const { userId } = await this.queryBus.execute<FindOrgByIdQuery, Organization>(new FindOrgByIdQuery(orgId))

      if (userId.toString() === reqUserId) {
        await this.commandBus.execute(new DeleteOrganizationCommand(orgId))
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
