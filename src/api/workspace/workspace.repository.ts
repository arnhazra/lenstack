import { Injectable } from "@nestjs/common"
import { WorkspaceModel } from "./entities/workspace.entity"
import { UserModel } from "../user/entities/user.entity"
import { randomUUID } from "crypto"

@Injectable()
export class WorkspaceRepository {
  async createWorkspace(name: string, ownerId: string) {
    const clientId = randomUUID()
    const clientSecret = randomUUID()
    const workspace = new WorkspaceModel({ name, ownerId, clientId, clientSecret })
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

  async switchWorkspace(userId: string, workspaceId: string) {
    await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId: workspaceId })
    return true
  }
}
