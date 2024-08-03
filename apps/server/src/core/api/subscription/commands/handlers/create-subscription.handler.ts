import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateSubscriptionCommand } from "../impl/create-subscription.command"
import { SubscriptionRepository } from "../../subscription.repository"
import { Subscription } from "../../schemas/subscription.schema"
import { subscriptionConfig } from "../../subscription.config"

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler implements ICommandHandler<CreateSubscriptionCommand> {
  constructor(private readonly repository: SubscriptionRepository) { }

  async execute(command: CreateSubscriptionCommand): Promise<Subscription> {
    const { selectedPlan, userId } = command
    const remainingCredits = subscriptionConfig.find((item) => item.planName === selectedPlan).grantedCredits
    return await this.repository.createOne(userId, selectedPlan, remainingCredits)
  }
}
