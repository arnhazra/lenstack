import { WorkspaceModel } from "../models/workspace.model"

export default async function findWorkspaceById(workspaceId: string) {
  const workspace = await WorkspaceModel.findById(workspaceId)
  return workspace
}