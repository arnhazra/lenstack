import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { HttpNosqlRepository } from "../../httpnosql.repository"
import { ReadAllValuesQuery } from "../impl/read-all-values.query"

@QueryHandler(ReadAllValuesQuery)
export class ReadAllDataQueryHandler
  implements IQueryHandler<ReadAllValuesQuery>
{
  constructor(private readonly repository: HttpNosqlRepository) {}

  async execute(query: ReadAllValuesQuery) {
    const { workspaceId } = query
    return await this.repository.readAllValues(workspaceId)
  }
}
