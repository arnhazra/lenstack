import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllOrgQuery } from "../impl/find-all-org.query"
import { OrganizationRepository } from "../../organization.repository"
import { Types } from "mongoose"
import { Organization } from "../../schemas/organization.schema"

@QueryHandler(FindAllOrgQuery)
export class FindAllOrgQueryQueryHandler implements IQueryHandler<FindAllOrgQuery> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(query: FindAllOrgQuery): Promise<Organization[]> {
    const { userId } = query
    return await this.repository.findAll({ userId: new Types.ObjectId(userId) })
  }
}