import { UserModel } from "src/api/user/models/user.model"

export async function switchWorkspaceCommand(userId: string, workspaceId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId: workspaceId })
  return true
}