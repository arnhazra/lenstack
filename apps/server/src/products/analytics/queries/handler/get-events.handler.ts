import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetEventsQuery } from "../impl/get-events.query"
import { AnalyticsRepository } from "../../analytics.repository"
import { Events } from "../../schemas/event.schema"

@QueryHandler(GetEventsQuery)
export class GetEventsQueryHandler implements IQueryHandler<GetEventsQuery> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(query: GetEventsQuery): Promise<Events[]> {
    const { orgId } = query
    return await this.repository.findAll(orgId)
  }
}
