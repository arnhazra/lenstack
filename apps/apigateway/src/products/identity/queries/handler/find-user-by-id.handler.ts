import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IdentityRepository } from "../../identity.repository"
import { FindUserByIdQuery } from "../impl/find-user-by-id.query"
import { Types } from "mongoose"

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly repository: IdentityRepository) { }

  async execute(query: FindUserByIdQuery) {
    const { userId, orgId } = query
    return await this.repository.findOne({ id: new Types.ObjectId(userId), orgId: new Types.ObjectId(orgId) })
  }
}
