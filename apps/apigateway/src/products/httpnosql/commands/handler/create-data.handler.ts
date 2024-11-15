import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateDataCommand } from "../impl/create-data.command"
import { HttpNosqlRepository } from "../../httpnosql.repository"

@CommandHandler(CreateDataCommand)
export class CreateDataCommandHandler
  implements ICommandHandler<CreateDataCommand>
{
  constructor(private readonly repository: HttpNosqlRepository) {}

  async execute(command: CreateDataCommand) {
    const { workspaceId, key, value } = command
    return await this.repository.createKeyValue(workspaceId, key, value)
  }
}
