import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateSubscriptionCommand } from "../impl/create-subscription.command"
import { SubscriptionRepository } from "../../subscription.repository"
import { Subscription } from "../../schemas/subscription.schema"

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler implements ICommandHandler<CreateSubscriptionCommand> {
  constructor(private readonly repository: SubscriptionRepository) { }

  async execute(command: CreateSubscriptionCommand): Promise<Subscription> {
    const { selectedPlan, userId } = command
    return await this.repository.createOne(userId, selectedPlan, 0)
  }
}
