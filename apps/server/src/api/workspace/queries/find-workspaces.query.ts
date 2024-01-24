import { WorkspaceModel } from "../models/workspace.model"

export async function findMyWorkspacesQuery(ownerId: string) {
  const myWorkspaces = await WorkspaceModel.find({ ownerId })
  return myWorkspaces
}