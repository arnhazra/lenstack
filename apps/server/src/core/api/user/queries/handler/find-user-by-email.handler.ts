import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { User } from "../../schemas/user.schema"
import { FindUserByEmailQuery } from "../impl/find-user-by-email.query"

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryQueryHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(private readonly repository: UserRepository) { }

  async execute(query: FindUserByEmailQuery): Promise<User> {
    const { email } = query
    return await this.repository.findOne({ email })
  }
}