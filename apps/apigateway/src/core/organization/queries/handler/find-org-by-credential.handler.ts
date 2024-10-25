import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindOrgByCredentialQuery } from "../impl/find-org-by-credential.query"
import { OrganizationRepository } from "../../organization.repository"

@QueryHandler(FindOrgByCredentialQuery)
export class FindOrgByCredentialQueryHandler
  implements IQueryHandler<FindOrgByCredentialQuery>
{
  constructor(private readonly repository: OrganizationRepository) {}

  async execute(query: FindOrgByCredentialQuery) {
    const { clientId, clientSecret } = query
    return await this.repository.findOne({ clientId, clientSecret })
  }
}
