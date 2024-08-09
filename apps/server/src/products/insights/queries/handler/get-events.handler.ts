import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetEventsQuery } from "../impl/get-events.query"
import { InsightsRepository } from "../../insights.repository"

@QueryHandler(GetEventsQuery)
export class GetEventsQueryHandler implements IQueryHandler<GetEventsQuery> {
  constructor(private readonly repository: InsightsRepository) { }

  async execute(query: GetEventsQuery) {
    const { orgId } = query
    return await this.repository.findAll(orgId)
  }
}
