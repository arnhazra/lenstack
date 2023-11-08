import { Module } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { WorkspaceController } from "./workspace.controller"
import { WorkspaceRepository } from "./workspace.repository"

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceRepository],
})

export class WorkspaceModule { }
