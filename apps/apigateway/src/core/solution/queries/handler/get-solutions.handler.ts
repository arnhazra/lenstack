import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSolutionsQuery } from "../impl/get-solutions.query";
import { SolutionsRepository } from "../../solution.repository";

@QueryHandler(GetSolutionsQuery)
export class GetSolutionsQueryHandler
  implements IQueryHandler<GetSolutionsQuery>
{
  constructor(private readonly repository: SolutionsRepository) {}

  async execute(query: GetSolutionsQuery) {
    return await this.repository.findAll();
  }
}
