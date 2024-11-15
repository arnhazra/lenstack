import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { HttpNosqlRepository } from "../../httpnosql.repository"
import { UpdateDataCommand } from "../impl/update-data.command"

@CommandHandler(UpdateDataCommand)
export class UpdateDataCommandHandler
  implements ICommandHandler<UpdateDataCommand>
{
  constructor(private readonly repository: HttpNosqlRepository) {}

  async execute(command: UpdateDataCommand) {
    const { workspaceId, key, value } = command
    return await this.repository.updateValueByKey(workspaceId, key, value)
  }
}
