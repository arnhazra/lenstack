import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateSubscriptionCommand } from "../impl/create-subscription.command"
import { SubscriptionRepository } from "../../subscription.repository"
import { Types } from "mongoose"

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(private readonly repository: SubscriptionRepository) {}

  async execute(command: CreateSubscriptionCommand) {
    const { userId, subscriptionTier, xp, platformDelay, purchasePrice } =
      command
    await this.repository.delete({ userId: new Types.ObjectId(userId) })
    return await this.repository.create({
      userId: new Types.ObjectId(userId),
      subscriptionTier,
      xp,
      purchasePrice,
      platformDelay,
    })
  }
}
