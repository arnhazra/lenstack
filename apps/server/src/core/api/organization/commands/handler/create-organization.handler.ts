import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateOrganizationCommand } from "../impl/create-organization.command"
import { OrganizationRepository } from "../../organization.repository"
import { Organization } from "../../schemas/organization.schema"

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler implements ICommandHandler<CreateOrganizationCommand> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(command: CreateOrganizationCommand): Promise<Organization> {
    const { name, userId } = command
    return await this.repository.createOne(name, userId)
  }
}
