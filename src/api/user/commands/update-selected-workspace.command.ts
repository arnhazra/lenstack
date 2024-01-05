import { UserModel } from "../models/user.model"

export async function updateSelectedWorkspaceCommand(userId: string, selectedWorkspaceId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId })
  return true
}