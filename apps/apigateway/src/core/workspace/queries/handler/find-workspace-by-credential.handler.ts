import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindWorkspaceByCredentialQuery } from "../impl/find-workspace-by-credential.query"
import { WorkspaceRepository } from "../../workspace.repository"

@QueryHandler(FindWorkspaceByCredentialQuery)
export class FindWorkspaceByCredentialQueryHandler
  implements IQueryHandler<FindWorkspaceByCredentialQuery>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(query: FindWorkspaceByCredentialQuery) {
    const { accessKey } = query
    return await this.repository.findOne({ accessKey })
  }
}
