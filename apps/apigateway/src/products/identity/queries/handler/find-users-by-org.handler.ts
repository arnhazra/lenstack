import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IdentityRepository } from "../../identity.repository"
import { Types } from "mongoose"
import { FindUsersByOrgQuery } from "../impl/find-users-by-org.query"

@QueryHandler(FindUsersByOrgQuery)
export class FindUsersByOrgQueryHandler implements IQueryHandler<FindUsersByOrgQuery> {
  constructor(private readonly repository: IdentityRepository) { }

  async execute(query: FindUsersByOrgQuery) {
    const { orgId } = query
    return await this.repository.findAll({ orgId: new Types.ObjectId(orgId) })
  }
}
