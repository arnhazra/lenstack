import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindWorkspaceByIdQuery } from "../impl/find-workspace-by-id.query"
import { WorkspaceRepository } from "../../workspace.repository"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindWorkspaceByIdQuery)
export class FindWorkspaceByIdQueryHandler
  implements IQueryHandler<FindWorkspaceByIdQuery>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(query: FindWorkspaceByIdQuery) {
    const { workspaceId } = query
    return await this.repository.findOne({
      _id: objectId(workspaceId),
    })
  }
}
