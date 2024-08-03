import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { DeleteOrganizationCommand } from "../impl/delete-organization.command"
import { Organization } from "../../schemas/organization.schema"
import { OrganizationRepository } from "../../organization.repository"

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationCommandHandler implements ICommandHandler<DeleteOrganizationCommand> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(command: DeleteOrganizationCommand): Promise<Organization> {
    const { orgId } = command
    return await this.repository.deleteById(orgId)
  }
}
