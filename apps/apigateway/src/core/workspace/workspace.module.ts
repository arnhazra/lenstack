import { Module } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { WorkspaceController } from "./workspace.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { Workspace, WorkspaceSchema } from "./schemas/workspace.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { WorkspaceRepository } from "./workspace.repository"
import { CreateWorkspaceCommandHandler } from "./commands/handler/create-workspace.handler"
import { DeleteWorkspaceCommandHandler } from "./commands/handler/delete-workspace.handler"
import { FindAllWorkspaceQueryHandler } from "./queries/handler/find-all-workspaces.handler"
import { FindWorkspaceByCredentialQueryHandler } from "./queries/handler/find-workspace-by-credential.handler"
import { FindWorkspaceByIdQueryHandler } from "./queries/handler/find-workspace-by-id.handler"
import { UpdateWorkspaceCommandHandler } from "./commands/handler/update-workspace.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: Workspace.name, schema: WorkspaceSchema }],
      DbConnectionMap.Core
    ),
  ],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    WorkspaceRepository,
    CreateWorkspaceCommandHandler,
    DeleteWorkspaceCommandHandler,
    FindAllWorkspaceQueryHandler,
    FindWorkspaceByCredentialQueryHandler,
    FindWorkspaceByIdQueryHandler,
    UpdateWorkspaceCommandHandler,
  ],
})
export class WorkspaceModule {}
