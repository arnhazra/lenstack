import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Data } from "../../schemas/data.schema"
import { HttpNosqlRepository } from "../../httpnosql.repository"
import { UpdateDataCommand } from "../impl/update-data.command"

@CommandHandler(UpdateDataCommand)
export class UpdateDataCommandHandler implements ICommandHandler<UpdateDataCommand> {
  constructor(private readonly repository: HttpNosqlRepository) { }

  async execute(command: UpdateDataCommand): Promise<Data> {
    const { orgId, key, value } = command
    return await this.repository.updateValueByKey(orgId, key, value)
  }
}