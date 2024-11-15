import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { FindUserByEmailQuery } from "../impl/find-user-by-email.query"

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler
  implements IQueryHandler<FindUserByEmailQuery>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(query: FindUserByEmailQuery) {
    const { email } = query
    return await this.repository.findOne({ email })
  }
}
