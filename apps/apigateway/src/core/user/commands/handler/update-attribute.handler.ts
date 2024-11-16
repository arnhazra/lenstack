import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import {
  AttributeNames,
  UpdateAttributeCommand,
} from "../impl/update-attribute.command"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeCommandHandler
  implements ICommandHandler<UpdateAttributeCommand>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateAttributeCommand) {
    const { userId, attributeName, attributeValue } = command

    if (
      attributeName === AttributeNames.ReduceCarbonEmissions ||
      attributeName === AttributeNames.ActivityLog ||
      attributeName === AttributeNames.HasTrial
    ) {
      if (attributeValue === "true") {
        return await this.repository.updateOneById(userId, attributeName, true)
      }

      return await this.repository.updateOneById(userId, attributeName, false)
    }

    if (attributeName === AttributeNames.selectedWorkspaceId) {
      const value = objectId(attributeValue)
      return await this.repository.updateOneById(userId, attributeName, value)
    }
  }
}
