import { UserModel } from "src/api/user/schemas/user.schema"

export async function switchOrganizationCommand(userId: string, orgId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedOrgId: orgId })
  return true
}