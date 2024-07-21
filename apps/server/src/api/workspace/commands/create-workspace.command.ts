import { randomUUID } from "crypto"
import { WorkspaceModel } from "../models/workspace.model"

export async function createWorkspaceCommand(name: string, userId: string) {
  const clientId = randomUUID()
  const clientSecret = randomUUID()
  const workspace = new WorkspaceModel({ name, userId, clientId, clientSecret })
  await workspace.save()
  return workspace
}