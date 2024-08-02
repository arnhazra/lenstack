import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Data } from "../../schemas/data.schema"
import { HttpNosqlRepository } from "../../httpnosql.repository"
import { ReadValueByKeyQuery } from "../impl/read-value-by-key.query"

@QueryHandler(ReadValueByKeyQuery)
export class ReadOneDataQueryHandler implements IQueryHandler<ReadValueByKeyQuery> {
  constructor(private readonly repository: HttpNosqlRepository) { }

  async execute(query: ReadValueByKeyQuery): Promise<Data> {
    const { orgId, key } = query
    return await this.repository.readValueByKey(orgId, key)
  }
}