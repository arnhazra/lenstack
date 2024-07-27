import { UserModel } from "src/api/user/models/user.model"

export async function switchOrganizationCommand(userId: string, orgId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedOrgId: orgId })
  return true
}