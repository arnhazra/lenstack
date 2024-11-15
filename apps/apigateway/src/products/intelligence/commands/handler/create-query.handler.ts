import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { IntelligenceRepository } from "../../intelligence.repository"
import { CreateQueryCommand } from "../impl/create-query.command"
import { Types } from "mongoose"

@CommandHandler(CreateQueryCommand)
export class CreateQueryCommandHandler
  implements ICommandHandler<CreateQueryCommand>
{
  constructor(private readonly repository: IntelligenceRepository) {}

  async execute(command: CreateQueryCommand) {
    const { workspaceId, prompt, response } = command
    return await this.repository.create({
      workspaceId: new Types.ObjectId(workspaceId),
      prompt,
      response,
    })
  }
}
