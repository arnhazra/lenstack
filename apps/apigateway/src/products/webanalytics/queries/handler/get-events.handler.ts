import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetEventsQuery } from "../impl/get-events.query"
import { WebAnalyticsRepository } from "../../webanalytics.repository"

@QueryHandler(GetEventsQuery)
export class GetEventsQueryHandler implements IQueryHandler<GetEventsQuery> {
  constructor(private readonly repository: WebAnalyticsRepository) { }

  async execute(query: GetEventsQuery) {
    const { orgId } = query
    return await this.repository.find(orgId)
  }
}
