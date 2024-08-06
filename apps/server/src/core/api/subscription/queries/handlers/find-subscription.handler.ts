import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { SubscriptionRepository } from "../../subscription.repository"
import { FindSubscriptionQuery } from "../impl/find-subscription.query"

@QueryHandler(FindSubscriptionQuery)
export class FindSubscriptionQueryHandler implements IQueryHandler<FindSubscriptionQuery> {
  constructor(private readonly repository: SubscriptionRepository) { }

  async execute(query: FindSubscriptionQuery) {
    const { userId } = query
    return await this.repository.findOne(userId)
  }
}
