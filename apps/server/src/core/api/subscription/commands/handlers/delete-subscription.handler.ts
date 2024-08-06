import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { SubscriptionRepository } from "../../subscription.repository"
import { DeleteSubscriptionCommand } from "../impl/delete-subscription.command"

@CommandHandler(DeleteSubscriptionCommand)
export class DeleteSubscriptionCommandHandler implements ICommandHandler<DeleteSubscriptionCommand> {
  constructor(private readonly repository: SubscriptionRepository) { }

  async execute(command: DeleteSubscriptionCommand) {
    const { userId } = command
    return await this.repository.deleteOne(userId)
  }
}
