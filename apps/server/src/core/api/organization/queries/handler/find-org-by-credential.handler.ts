import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindOrgByCredentialQuery } from "../impl/find-org-by-credential.query"
import { OrganizationRepository } from "../../organization.repository"
import { Organization } from "../../schemas/organization.schema"

@QueryHandler(FindOrgByCredentialQuery)
export class FindOrgByCredentialQueryQueryHandler implements IQueryHandler<FindOrgByCredentialQuery> {
  constructor(private readonly repository: OrganizationRepository) { }

  async execute(query: FindOrgByCredentialQuery): Promise<Organization> {
    const { clientId, clientSecret } = query
    return await this.repository.findOne({ clientId, clientSecret })
  }
}