import { UserModel } from "src/api/user/entities/user.entity"

export default async function switchWorkspace(userId: string, workspaceId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId: workspaceId })
  return true
}