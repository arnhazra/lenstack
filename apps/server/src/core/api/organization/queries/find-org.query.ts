import { OrganizationModel } from "../schemas/organization.schema"

export async function findMyOrganizationsQuery(userId: string) {
  const myOrganizations = await OrganizationModel.find({ userId })
  return myOrganizations
}