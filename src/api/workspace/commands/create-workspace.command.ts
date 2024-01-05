import { randomUUID } from "crypto"
import { WorkspaceModel } from "../models/workspace.model"

export async function createWorkspaceCommand(name: string, ownerId: string) {
  const clientId = randomUUID()
  const clientSecret = randomUUID()
  const workspace = new WorkspaceModel({ name, ownerId, clientId, clientSecret })
  await workspace.save()
  return workspace
}