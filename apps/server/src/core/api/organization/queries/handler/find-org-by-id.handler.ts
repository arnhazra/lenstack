import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindOrgByIdQuery } from "../impl/find-org-by-id.query"
import { OrganizationRepository } from "../../organization.repository"
import { Organization } from "../../schemas/organization.schema"
import { Types } from "mongoose"

@QueryHandler(FindOrgByIdQuery)
export class FindOrgByIdQueryQueryHandler implements IQueryHandler<FindOrgByIdQuery> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(query: FindOrgByIdQuery): Promise<Organization> {
    const { orgId } = query
    return await this.repository.findOne({ _id: new Types.ObjectId(orgId) })
  }
}