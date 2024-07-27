import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetAnalyticsQuery } from "../impl/get-analytics.query"
import { AnalyticsRepository } from "../../analytics.repository"

@QueryHandler(GetAnalyticsQuery)
export class GetAnalyticsQueryHandler implements IQueryHandler<GetAnalyticsQuery> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(query: GetAnalyticsQuery) {
    const { orgId } = query
    return await this.repository.findAll(orgId)
  }
}
