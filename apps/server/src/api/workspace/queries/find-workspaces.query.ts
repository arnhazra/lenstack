import { WorkspaceModel } from "../models/workspace.model"

export async function findMyWorkspacesQuery(userId: string) {
  const myWorkspaces = await WorkspaceModel.find({ userId })
  return myWorkspaces
}