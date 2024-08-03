import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetSolutionsQuery } from "../impl/get-solutions.query"
import { SolutionsRepository } from "../../solution.repository"
import { Solution } from "../../schemas/solutions.schema"

@QueryHandler(GetSolutionsQuery)
export class GetSolutionsQueryHandler implements IQueryHandler<GetSolutionsQuery> {
  constructor(private readonly repository: SolutionsRepository) { }

  async execute(query: GetSolutionsQuery): Promise<Solution[]> {
    return await this.repository.getSolutionConfig()
  }
}
