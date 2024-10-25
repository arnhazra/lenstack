import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateActivityCommand } from "../impl/create-activity.command"
import { ActivityRepository } from "../../activity.repository"
import { Types } from "mongoose"

@CommandHandler(CreateActivityCommand)
export class CreateActivityCommandHandler
	implements ICommandHandler<CreateActivityCommand>
{
	constructor(private readonly repository: ActivityRepository) {}

	async execute(command: CreateActivityCommand) {
		const { createActivityDto } = command
		const { userId, method, apiUri } = createActivityDto
		return await this.repository.create({
			method,
			apiUri,
			userId: new Types.ObjectId(userId),
		})
	}
}
