import { UserModel } from "src/api/user/entities/user.entity"

export async function switchWorkspaceCommand(userId: string, workspaceId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId: workspaceId })
  return true
}