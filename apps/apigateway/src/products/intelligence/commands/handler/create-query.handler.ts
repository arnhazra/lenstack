import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { IntelligenceRepository } from "../../intelligence.repository"
import { CreateQueryCommand } from "../impl/create-query.command"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(CreateQueryCommand)
export class CreateQueryCommandHandler
  implements ICommandHandler<CreateQueryCommand>
{
  constructor(private readonly repository: IntelligenceRepository) {}

  async execute(command: CreateQueryCommand) {
    const { workspaceId, prompt, response } = command
    return await this.repository.create({
      workspaceId: objectId(workspaceId),
      prompt,
      response,
    })
  }
}
