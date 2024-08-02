import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Data } from "../../schemas/data.schema"
import { CreateDataCommand } from "../impl/create-data.command"
import { HttpNosqlRepository } from "../../httpnosql.repository"

@CommandHandler(CreateDataCommand)
export class CreateDataCommandHandler implements ICommandHandler<CreateDataCommand> {
  constructor(private readonly repository: HttpNosqlRepository) { }

  async execute(command: CreateDataCommand): Promise<Data> {
    const { orgId, key, value } = command
    return await this.repository.createKeyValue(orgId, key, value)
  }
}