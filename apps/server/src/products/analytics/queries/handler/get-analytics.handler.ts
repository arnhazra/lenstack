import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetAnalyticsQuery } from "../impl/get-analytics.query"
import { AnalyticsFactory } from "../../analytics.factory"

@QueryHandler(GetAnalyticsQuery)
export class GetAnalyticsQueryHandler implements IQueryHandler<GetAnalyticsQuery> {
  constructor(private readonly analyticsFactory: AnalyticsFactory) { }

  async execute(query: GetAnalyticsQuery) {
    const { orgId } = query
    return await this.analyticsFactory.findAll(orgId)
  }
}
