import { WorkspaceModel } from "../models/workspace.model"

export default async function findMyWorkspaces(ownerId: string) {
  const myWorkspaces = await WorkspaceModel.find({ ownerId })
  return myWorkspaces
}