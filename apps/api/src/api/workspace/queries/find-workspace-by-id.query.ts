import { WorkspaceModel } from "../models/workspace.model"

export async function findWorkspaceByIdQuery(workspaceId: string) {
  const workspace = await WorkspaceModel.findById(workspaceId)
  return workspace
}