import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllOrgQuery } from "../impl/find-all-org.query"
import { OrganizationRepository } from "../../organization.repository"
import { Types } from "mongoose"

@QueryHandler(FindAllOrgQuery)
export class FindAllOrgQueryHandler implements IQueryHandler<FindAllOrgQuery> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(query: FindAllOrgQuery) {
    const { userId } = query
    return await this.repository.findAll({ userId: new Types.ObjectId(userId) })
  }
}