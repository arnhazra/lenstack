import { Injectable } from "@nestjs/common"
import { WorkspaceModel } from "./entities/workspace.entity"

@Injectable()
export class WorkspaceRepository {
  async createWorkspace(name: string, ownerId: string) {
    const workspace = new WorkspaceModel({ name, ownerId })
    await workspace.save()
    return workspace
  }

  async findMyWorkspaces(ownerId: string) {
    const myWorkspaces = await WorkspaceModel.find({ ownerId })
    return myWorkspaces
  }

  async findWorkspaceById(workspaceId: string) {
    const workspace = await WorkspaceModel.findById(workspaceId)
    return workspace
  }

  async deleteWorkspaceById(workspaceId: string) {
    await WorkspaceModel.findByIdAndDelete(workspaceId)
    return true
  }
}
