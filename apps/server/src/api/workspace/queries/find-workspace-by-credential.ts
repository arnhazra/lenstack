import { WorkspaceModel } from "../models/workspace.model"

export async function findWorkspaceByCredentialQuery(clientId: string, clientSecret: string) {
  const workspace = await WorkspaceModel.findOne({ clientId, clientSecret })
  return workspace
}