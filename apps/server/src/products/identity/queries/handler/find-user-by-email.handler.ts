import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IdentityRepository } from "../../identity.repository"
import { FindUserByEmailQuery } from "../impl/find-user-by-email.query"
import { Types } from "mongoose"

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(private readonly repository: IdentityRepository) { }

  async execute(query: FindUserByEmailQuery) {
    const { email, orgId } = query
    return await this.repository.findOne({ email, orgId: new Types.ObjectId(orgId) })
  }
}