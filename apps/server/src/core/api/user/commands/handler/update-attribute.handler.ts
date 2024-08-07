import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { UpdateAttributeCommand } from "../impl/update-attribute.command"
import { Types } from "mongoose"

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeCommandHandler implements ICommandHandler<UpdateAttributeCommand> {
  constructor(private readonly repository: UserRepository) { }

  async execute(command: UpdateAttributeCommand) {
    const { userId, attributeName, attributeValue } = command
    let value: Types.ObjectId | boolean
    if (attributeValue === "true") {
      value = true
    } else if (attributeValue === "false") {
      value = false
    } else {
      value = new Types.ObjectId(attributeValue)
    }

    return await this.repository.updateOneById(userId, attributeName, value)
  }
}
