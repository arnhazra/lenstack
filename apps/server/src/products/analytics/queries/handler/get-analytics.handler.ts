import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetAnalyticsQuery } from "../impl/get-analytics.query"
import { AnalyticsRepository } from "../../analytics.repository"
import { Analytics } from "../../schemas/analytics.schema"

@QueryHandler(GetAnalyticsQuery)
export class GetAnalyticsQueryHandler implements IQueryHandler<GetAnalyticsQuery> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(query: GetAnalyticsQuery): Promise<Analytics[]> {
    const { orgId } = query
    return await this.repository.findAll(orgId)
  }
}
