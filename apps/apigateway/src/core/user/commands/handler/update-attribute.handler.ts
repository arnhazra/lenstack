import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import {
  AttributeNames,
  UpdateAttributeCommand,
} from "../impl/update-attribute.command"
import { Types } from "mongoose"
import { ComputeTier } from "src/core/pricing/pricing.config"

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeCommandHandler
  implements ICommandHandler<UpdateAttributeCommand>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateAttributeCommand) {
    const { userId, attributeName, attributeValue } = command

    if (
      attributeName === AttributeNames.ReduceCarbonEmissions ||
      attributeName === AttributeNames.ActivityLog
    ) {
      if (attributeValue === "true") {
        return await this.repository.updateOneById(userId, attributeName, true)
      }

      return await this.repository.updateOneById(userId, attributeName, false)
    }

    if (attributeName === AttributeNames.SelectedOrgId) {
      const value = new Types.ObjectId(attributeValue)
      return await this.repository.updateOneById(userId, attributeName, value)
    }

    if (attributeName === AttributeNames.ComputeTier) {
      const value = attributeValue as ComputeTier
      return await this.repository.updateOneById(userId, attributeName, value)
    }
  }
}
