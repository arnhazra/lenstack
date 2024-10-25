import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { UpdateOrganizationCommand } from "../impl/update-organization.command";
import { OrganizationRepository } from "../../organization.repository";

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationCommandHandler
  implements ICommandHandler<UpdateOrganizationCommand>
{
  constructor(private readonly repository: OrganizationRepository) {}

  async execute(command: UpdateOrganizationCommand) {
    const { userId, orgId } = command;
    return await this.repository.updateById(userId, orgId);
  }
}
