import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateOrganizationCommand } from "../impl/create-organization.command"
import { OrganizationRepository } from "../../organization.repository"

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler
	implements ICommandHandler<CreateOrganizationCommand>
{
	constructor(private readonly repository: OrganizationRepository) {}

	async execute(command: CreateOrganizationCommand) {
		const { name, userId } = command
		return await this.repository.createOne({ name, userId })
	}
}
