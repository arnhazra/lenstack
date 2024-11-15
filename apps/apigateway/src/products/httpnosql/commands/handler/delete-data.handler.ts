import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { HttpNosqlRepository } from "../../httpnosql.repository"
import { DeleteDataCommand } from "../impl/delete-data.command"

@CommandHandler(DeleteDataCommand)
export class DeleteDataCommandHandler
  implements ICommandHandler<DeleteDataCommand>
{
  constructor(private readonly repository: HttpNosqlRepository) {}

  async execute(command: DeleteDataCommand) {
    const { workspaceId, key } = command
    return await this.repository.deleteValueByKey(workspaceId, key)
  }
}
