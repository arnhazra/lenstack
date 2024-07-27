import { UserModel } from "../../user/schemas/user.schema"

export async function switchOrganizationCommand(userId: string, orgId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedOrgId: orgId })
  return true
}