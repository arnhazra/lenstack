import { UserModel } from "../schemas/user.schema"

export async function updateSelectedOrganizationCommand(userId: string, selectedOrgId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedOrgId })
  return true
}